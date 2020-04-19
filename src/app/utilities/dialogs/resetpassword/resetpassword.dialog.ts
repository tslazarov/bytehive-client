import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BhValidators } from '../../validators/bhvalidators';
import { AccountService } from '../../../services/account.service';
import { ResetCodeVerification } from '../../../models/resetcodeverification.model';
import { ResetPasswordVerification } from '../../../models/resetpasswordverification.model';

@Component({
    selector: 'resetpassword-dialog',
    templateUrl: './resetpassword-dialog.html',
    styleUrls: ['./resetpassword.dialog.css']
})
export class ResetPasswordDialog {

    codeSent: boolean;
    showLoading: boolean;
    showErrorMessage: boolean;

    resetCodeFormGroup: FormGroup;
    resetPasswordFormGroup: FormGroup;

    // labels
    emailLabel: string;
    emailRequiredErrorLabel: string;
    emailPatternErrorLabel: string;
    verificationCodeLabel: string;
    verificationCodeRequiredErrorLabel: string;
    passwordLabel: string;
    passwordRequiredErrorLabel: string;
    passwordLengthErrorLabel: string;
    confirmPasswordLabel: string;
    confirmPasswordMatchErrorLabel: string;
    resetPasswordLabel: string;
    sendCodeLabel: string;
    savePasswordLabel: string;
    errorMessageLabel: string;

    constructor(public dialogRef: MatDialogRef<ResetPasswordDialog>,
        private translationService: TranslationService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();

        this.codeSent = false;
        this.showLoading = false;

        this.resetCodeFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.resetPasswordFormGroup = this.formBuilder.group({
            code: ['', [Validators.required]],
            password: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: BhValidators.identicalFields })
        });
    }

    setLabelsMessages(): void {
        this.emailLabel = this.translationService.localizeValue('emailLabel', 'resetpassword-dialog', 'label');
        this.emailRequiredErrorLabel = this.translationService.localizeValue('emailRequiredErrorLabel', 'resetpassword-dialog', 'label');
        this.emailPatternErrorLabel = this.translationService.localizeValue('emailPatternErrorLabel', 'resetpassword-dialog', 'label');
        this.verificationCodeLabel = this.translationService.localizeValue('verificationCodeLabel', 'resetpassword-dialog', 'label');
        this.verificationCodeRequiredErrorLabel = this.translationService.localizeValue('verificationCodeRequiredErrorLabel', 'resetpassword-dialog', 'label');
        this.passwordLabel = this.translationService.localizeValue('passwordLabel', 'resetpassword-dialog', 'label');
        this.passwordRequiredErrorLabel = this.translationService.localizeValue('passwordRequiredErrorLabel', 'resetpassword-dialog', 'label');
        this.passwordLengthErrorLabel = this.translationService.localizeValue('passwordLengthErrorLabel', 'resetpassword-dialog', 'label');
        this.confirmPasswordLabel = this.translationService.localizeValue('confirmPasswordLabel', 'resetpassword-dialog', 'label');
        this.confirmPasswordMatchErrorLabel = this.translationService.localizeValue('confirmPasswordMatchErrorLabel', 'resetpassword-dialog', 'label');
        this.sendCodeLabel = this.translationService.localizeValue('sendCodeLabel', 'resetpassword-dialog', 'label');
        this.savePasswordLabel = this.translationService.localizeValue('savePasswordLabel', 'resetpassword-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    sendCode(): void {
        let resetCodeVerification = new ResetCodeVerification();
        resetCodeVerification.email = this.resetCodeFormGroup.value.email;

        this.showLoading = true;

        this.accountService.resetcode(resetCodeVerification)
            .subscribe((result) => {
                this.codeSent = true;
                this.showLoading = false;
            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;
                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'resetpassword-dialog', 'label');

                setTimeout(() => this.showErrorMessage = false, 3000);
            });
    }

    resetPassword(): void {
        let resetPasswordVerification = new ResetPasswordVerification();
        resetPasswordVerification.email = this.resetCodeFormGroup.value.email;
        resetPasswordVerification.code = this.resetPasswordFormGroup.value.code;
        resetPasswordVerification.password = this.resetPasswordFormGroup.controls['password'].value.password;
        resetPasswordVerification.confirmPassword = this.resetPasswordFormGroup.controls['password'].value.confirmPassword;

        this.showLoading = true;

        this.accountService.resetpassword(resetPasswordVerification)
            .subscribe((result) => {
                this.showLoading = false;
                this.dialogRef.close(true);
            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;
                this.errorMessageLabel = this.translationService.localizeValue('invalidInformationLabel', 'resetpassword-dialog', 'label');

                setTimeout(() => this.showErrorMessage = false, 10000);
            });
    }
}

export class ResetPasswordData {
    status: boolean;
}