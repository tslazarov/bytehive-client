import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../services/utilities/translation.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { BhValidators, BhConfirmPasswordMatcher } from '../../../utilities/validators/bhvalidators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'bh-profile-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

    // common
    changePasswordFormGroup: FormGroup;
    confirmPasswordMatcher: BhConfirmPasswordMatcher;
    showCurrentPassword: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    showLoading: boolean;
    showErrorMessage: boolean;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    securityLabel: string;
    currentPasswordLabel: string;
    passwordRequiredErrorLabel: string;
    passwordLengthErrorLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    confirmPasswordMatchErrorLabel: string;
    saveLabel: string;


    constructor(private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.confirmPasswordMatcher = new BhConfirmPasswordMatcher();

        this.changePasswordFormGroup = this.formBuilder.group({
            currentPassword: ['', [Validators.required]],
            password: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: BhValidators.identicalFields }),
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
        this.securityLabel = this.translationService.localizeValue('securityLabel', 'security-profile', 'label');
        this.currentPasswordLabel = this.translationService.localizeValue('currentPasswordLabel', 'security-profile', 'label');
        this.passwordRequiredErrorLabel = this.translationService.localizeValue('passwordRequiredErrorLabel', 'security-profile', 'label');
        this.passwordLengthErrorLabel = this.translationService.localizeValue('passwordLengthErrorLabel', 'security-profile', 'label');
        this.passwordLabel = this.translationService.localizeValue('passwordLabel', 'security-profile', 'label');
        this.confirmPasswordLabel = this.translationService.localizeValue('confirmPasswordLabel', 'security-profile', 'label');
        this.confirmPasswordMatchErrorLabel = this.translationService.localizeValue('confirmPasswordMatchErrorLabel', 'security-profile', 'label');
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'security-profile', 'label');
    }
}
