import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScrapeType } from '../../../models/enums/scrapetype.enum';
import { TranslationService } from '../../../services/utilities/translation.service';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'bh-scrapepicker',
    templateUrl: './scrapepicker.component.html',
    styleUrls: ['./scrapepicker.component.css']
})
export class ScrapepickerComponent implements OnInit {

    @Input() parentForm: FormGroup;

    // common
    selectedOption: number;

    // subscriptions
    languageChangeSubscription: Subscription;

    // enums
    scrapeTypes = ScrapeType;

    // labels
    listDetailPagesLabel: string;
    listPagesLabel: string;
    detailPagesLabel: string;
    listDetailDescriptionLabel: string;
    listDescriptionLabel: string;
    detailDescriptionLabel: string;

    constructor(private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.listDetailPagesLabel = this.translationService.localizeValue('listDetailPagesLabel', 'scrapepicker', 'label');
        this.listPagesLabel = this.translationService.localizeValue('listPagesLabel', 'scrapepicker', 'label');
        this.detailPagesLabel = this.translationService.localizeValue('detailPagesLabel', 'scrapepicker', 'label');
        this.listDetailDescriptionLabel = this.translationService.localizeValue('listDetailDescriptionLabel', 'scrapepicker', 'label');
        this.listDescriptionLabel = this.translationService.localizeValue('listDescriptionLabel', 'scrapepicker', 'label');
        this.detailDescriptionLabel = this.translationService.localizeValue('detailDescriptionLabel', 'scrapepicker', 'label');
    }

    selectOption(option): void {
        this.selectedOption = option;

        this.parentForm.patchValue({ scrapeType: this.selectedOption });
    }

    isOptionActive(option: number): boolean {
        return this.selectedOption === option;
    }
}
