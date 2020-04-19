import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExportType } from '../../../models/enums/exporttype.enum';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { TranslationService } from '../../../services/utilities/translation.service';

@Component({
    selector: 'bh-exportpicker',
    templateUrl: './exportpicker.component.html',
    styleUrls: ['./exportpicker.component.css']
})
export class ExportpickerComponent implements OnInit, OnDestroy {

    @Input() parentForm: FormGroup;

    // common
    selectedOption: number;

    // subscriptions
    languageChangeSubscription: Subscription;

    // enums
    exportTypes = ExportType;

    // labels
    jsonFormatLabel: string;
    xmlFormatLabel: string;
    csvFormatLabel: string;
    txtFormatLabel: string;
    jsonDescriptionLabel: string;
    xmlDescriptionLabel: string;
    csvDescriptionLabel: string;
    txtDescriptionLabel: string;

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
        this.jsonFormatLabel = this.translationService.localizeValue('jsonFormatLabel', 'exportpicker', 'label');
        this.xmlFormatLabel = this.translationService.localizeValue('xmlFormatLabel', 'exportpicker', 'label');
        this.csvFormatLabel = this.translationService.localizeValue('csvFormatLabel', 'exportpicker', 'label');
        this.txtFormatLabel = this.translationService.localizeValue('txtFormatLabel', 'exportpicker', 'label');
        this.jsonDescriptionLabel = this.translationService.localizeValue('jsonDescriptionLabel', 'exportpicker', 'label');
        this.xmlDescriptionLabel = this.translationService.localizeValue('xmlDescriptionLabel', 'exportpicker', 'label');
        this.csvDescriptionLabel = this.translationService.localizeValue('csvDescriptionLabel', 'exportpicker', 'label');
        this.txtDescriptionLabel = this.translationService.localizeValue('txtDescriptionLabel', 'exportpicker', 'label');
    }

    selectOption(option): void {
        this.selectedOption = option;

        this.parentForm.patchValue({ exportType: this.selectedOption });
    }

    isOptionActive(option: number): boolean {
        return this.selectedOption === option;
    }
}
