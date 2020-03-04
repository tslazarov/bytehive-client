import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrawType } from '../../../models/enums/crawtype.enum';
import { TranslationService } from '../../../services/translation.service';
import { CommunicationService } from '../../../services/communication.service';

@Component({
    selector: 'bh-crawpicker',
    templateUrl: './crawpicker.component.html',
    styleUrls: ['./crawpicker.component.css']
})
export class CrawpickerComponent implements OnInit {

    @Input() parentForm: FormGroup;

    // common
    selectedOption: number;

    // subscriptions
    languageChangeSubscription: any;

    // enums
    crawTypes = CrawType;

    constructor(private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages() {

    }

    selectOption(option) {
        this.selectedOption = option;

        this.parentForm.patchValue({ crawType: this.selectedOption });
    }

    isOptionActive(option: number): boolean {
        return this.selectedOption === option;
    }
}
