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

    }

    selectOption(option): void {
        this.selectedOption = option;

        this.parentForm.patchValue({ scrapeType: this.selectedOption });
    }

    isOptionActive(option: number): boolean {
        return this.selectedOption === option;
    }
}
