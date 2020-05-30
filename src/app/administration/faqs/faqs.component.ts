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
    faqs: ListPayment[];
    triggerStatusUpdate: boolean;
    filterValue: string;
    notifier: NotifierService;

    searchValue: any = {};
    searchCondition: any = {};
    filterMethods = CONDITIONS_FUNCTIONS;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
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

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.categoriesLabel = this.translationService.localizeValue('categoriesLabel', 'faqs', 'label');
        this.searchLabel = this.translationService.localizeValue('searchLabel', 'faqs', 'label');
        this.createLabel = this.translationService.localizeValue('createLabel', 'faqs', 'label');
    }

    categoryChange(category: any): void {

    }

    createFaq(): void {
        let dialogRef = this.dialog.open(FaqCreateDialog, { width: '600px', minHeight: '100px', autoFocus: false, data: {} });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notifier.notify("success", this.translationService.localizeValue('faqCreateSuccessLabel', 'faqs', 'label'));
            }
        });
    }
}
