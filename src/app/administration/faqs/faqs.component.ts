import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { ListPayment } from '../../models/listpayment.model';
import { PaymentsService } from '../../services/payments.service';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { FaqsService } from '../../services/faqs.service';
import { ListFaqCategory } from '../../models/listfaqcategory.model';
import { id } from '@swimlane/ngx-charts/release/utils';
import { FaqCreateDialog } from '../../utilities/dialogs/faqcreate/faqcreate.dialog';
import { NotifierService } from 'angular-notifier';
import { ListFaq } from '../../models/listfaq.model';

export const CONDITIONS_FUNCTIONS = {
    'contains': function (value, filteredValue) {
        if (value != null && filteredValue != null) {
            return value.toLowerCase().includes(filteredValue.toLowerCase());
        }

        return value.includes(filteredValue);
    },
    'between-date-equal': function (value, filteredValue) {
        let currentDate = new Date(value);
        return currentDate >= filteredValue[0] && currentDate <= filteredValue[1];
    }
};

@Component({
    selector: 'app-faqs',
    templateUrl: './faqs.component.html',
    styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    displayedColumns: string[] = ['question', 'answer', 'action'];

    dataSource: MatTableDataSource<any>;
    faqCategories: ListFaqCategory[];
    faqs: ListFaq[];
    triggerStatusUpdate: boolean;
    filterValue: string;
    notifier: NotifierService;

    searchValue: any = {};
    searchCondition: any = {};
    filterMethods = CONDITIONS_FUNCTIONS;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    questionLabel: string;
    answerLabel: string;
    editLabel: string;
    deleteLabel: string;
    categoriesLabel: string;
    searchLabel: string;
    createLabel: string;

    constructor(private dialog: MatDialog,
        private notifierService: NotifierService,
        private faqsService: FaqsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) {
        this.notifier = notifierService;
    }

    ngOnInit() {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
            this.triggerStatusUpdate = this.triggerStatusUpdate === true ? false : true;
        });

        this.fetchFaqs();
        this.fetchCategories();
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchFaqs(): void {
        this.faqs = [];
        this.faqsService.getAll()
            .subscribe(result => {
                result.forEach(faq => {
                    var listFaq = faq as ListFaq;
                    this.faqs.push(listFaq);
                });

                this.bindDataSource(this.faqs);
            });
    }

    fetchCategories(): void {
        this.faqCategories = [];
        this.faqsService.getCategoriesAll()
            .subscribe(result => {
                let allCategory = new ListFaqCategory();
                allCategory.id = 'all';
                allCategory.nameEN = 'All';
                allCategory.nameBG = 'Всички';

                this.faqCategories.push(allCategory);

                result.forEach(faqCategory => {
                    var listFaqCategory = faqCategory as ListFaqCategory;
                    this.faqCategories.push(listFaqCategory);
                });
            })
    }

    bindDataSource(data: any): void {
        this.dataSource = new MatTableDataSource<ListFaq>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setLabelsMessages(): void {
        this.questionLabel = this.translationService.localizeValue('questionLabel', 'faqs', 'label');
        this.answerLabel = this.translationService.localizeValue('answerLabel', 'faqs', 'label');
        this.editLabel = this.translationService.localizeValue('editLabel', 'faqs', 'label');
        this.deleteLabel = this.translationService.localizeValue('deleteLabel', 'faqs', 'label');
        this.categoriesLabel = this.translationService.localizeValue('categoriesLabel', 'faqs', 'label');
        this.searchLabel = this.translationService.localizeValue('searchLabel', 'faqs', 'label');
        this.createLabel = this.translationService.localizeValue('createLabel', 'faqs', 'label');
    }

    categoryChange(category: any): void {
        let filteredRequests = category.value == 'all' ? this.faqs : this.faqs.filter(faq => { return faq.categoryId == category.value });

        this.bindDataSource(filteredRequests);
    }

    setOrPredicate(): void {
        this.dataSource.filterPredicate = (c: ListFaq, filter: any) => {
            let result = false;
            let keys = Object.keys(c);

            for (const key of keys) {
                let searchCondition = filter.conditions[key]; // get search filter method
                if (searchCondition && searchCondition !== 'none') {
                    if (filter.methods[searchCondition](c[key], filter.values[key]) === true) { // invoke search filter 
                        result = true // if one of the filters method not succeed the row will be remove from the filter result 
                        break;
                    }
                }
            }

            return result
        };
    }

    applyGlobalFilter(filterValue: string): void {
        this.searchValue = {};
        this.searchCondition = {};

        this.setOrPredicate();

        let language = this.translationService.getLanguage();

        if (language == 'en') {
            this.searchValue = { 'questionEN': filterValue, 'answerEN': filterValue };
            this.searchCondition = { 'questionEN': 'contains', 'answerEN': 'contains' };
        }
        else if (language == 'bg') {
            this.searchValue = { 'questionBG': filterValue, 'answerBG': filterValue };
            this.searchCondition = { 'questionBG': 'contains', 'answerBG': 'contains' };
        }

        let searchFilter: any = {
            values: this.searchValue,
            conditions: this.searchCondition,
            methods: this.filterMethods
        }

        this.dataSource.filter = searchFilter;
    }

    createFaq(): void {
        let dialogRef = this.dialog.open(FaqCreateDialog, { width: '600px', minHeight: '100px', autoFocus: false, data: {} });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notifier.notify('success', this.translationService.localizeValue('faqCreateSuccessLabel', 'faqs', 'label'));
                this.fetchFaqs();
            }
        });
    }
}
