import { Component, OnInit, HostListener, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ListFaqCategory } from '../../models/listfaqcategory.model';
import { ListFaq } from '../../models/listfaq.model';
import { FaqsService } from '../../services/faqs.service';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnDestroy {

    @ViewChildren('menuOption') menuOptions: QueryList<ElementRef>;

    lastCategory: any;
    selectedCategory: string;
    faqCategories: ListFaqCategory[];
    groupedFaqs: any;
    faqs: ListFaq[];
    triggerStatusUpdate: boolean;
    panelOpenState = false;

    // subscriptions
    languageChangeSubscription: Subscription;

    constructor(private faqsService: FaqsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) {
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

                this.groupedFaqs = this.faqs.reduce(function (rv, x) {
                    (rv[x['categoryId']] = rv[x['categoryId']] || []).push(x);
                    return rv;
                }, {});
            });
    }

    fetchCategories(): void {
        this.faqCategories = [];
        this.faqsService.getCategoriesAll()
            .subscribe(result => {
                result.forEach((faqCategory, index) => {
                    if (index == 0) {
                        this.selectedCategory = faqCategory.id;
                    }

                    var listFaqCategory = faqCategory as ListFaqCategory;
                    listFaqCategory.categoryName = listFaqCategory.nameEN.toLowerCase().split(' ').join('-');
                    this.faqCategories.push(listFaqCategory);
                });

                setTimeout(() => {
                    this.lastCategory = this.menuOptions.first.nativeElement;
                }, 1000);
            })
    }

    setLabelsMessages(): void {
    }

    open(event, category): void {
        console.log(this.lastCategory);
        event.stopPropagation();
        if (this.lastCategory && this.lastCategory != event.currentTarget) {
            this.lastCategory.classList.remove('selected');
        }
        this.lastCategory = event.currentTarget;
        event.currentTarget.classList.add('selected');

        this.selectedCategory = category;
    }
}
