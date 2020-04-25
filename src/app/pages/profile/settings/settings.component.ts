import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChangeSettings } from '../../../models/changesettings.model';

@Component({
    selector: 'bh-profile-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    // common
    settingsFormGroup: FormGroup;
    showLoading: boolean;
    showErrorMessage: boolean;
    showSuccessMessage: boolean;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    settingsLabel: string;
    saveLabel: string;
    errorMessageLabel: string;
    successMessageLabel: string;

    constructor(private formBuilder: FormBuilder,
        private accountSerivce: AccountService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.settingsFormGroup = this.formBuilder.group({
            defaultLanguage: ['']
        });

        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages() {
        this.settingsLabel = this.translationService.localizeValue('settingsLabel', 'settings-profile', 'label');
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'settings-profile', 'label');
    }

    changeSettings() {
        let changeSettings = new ChangeSettings();
        changeSettings.defaultLanguage = this.settingsFormGroup.controls['defaultLanguage'].value;

        this.showLoading = true;

        this.accountSerivce.changesettings(changeSettings).subscribe(result => {
            this.showLoading = false;

            if (result) {
                this.settingsFormGroup.reset();
                this.successMessageLabel = this.translationService.localizeValue('settingsChangedLabel', 'settings-profile', 'label');
                this.showSuccessMessage = true;
                setTimeout(() => this.showSuccessMessage = false, 3000);
            }
        }, (error) => {
            this.showErrorMessage = true;
            this.showLoading = false;

            if (error.status == 400) {
                this.errorMessageLabel = this.translationService.localizeValue('settingsNotChangedLabel', 'settings-profile', 'label');
            } else {
                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'settings-profile', 'label');
            }

            setTimeout(() => this.showErrorMessage = false, 3000);
        });
    }

}
