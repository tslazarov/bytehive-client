import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BhValidators } from '../../validators/bhvalidators';
import { AccountService } from '../../../services/account.service';
import { ResetCodeVerification } from '../../../models/resetcodeverification.model';
import { ResetPasswordVerification } from '../../../models/resetpasswordverification.model';
import { EmailChange } from '../../../models/emailchange.model';

@Component({
    selector: 'emailchange-dialog',
    templateUrl: './emailchange-dialog.html',
    styleUrls: ['./emailchange.dialog.css']
})
export class EmailChangeDialog {

    // common
    email: string;
    showLoading: boolean;
    showErrorMessage: boolean;

    emailChangeFormGroup: FormGroup;

    // labels
    passwordLabel: string;
    passwordRequiredErrorLabel: string;
    saveLabel: string;
    errorMessageLabel: string;

    constructor(public dialogRef: MatDialogRef<EmailChangeDialog>,
        private translationService: TranslationService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.email = this.data.emailChangeData.email;
        this.setLabelsMessages();

        this.emailChangeFormGroup = this.formBuilder.group({
            password: ['', [Validators.required]]
        });
    }

    setLabelsMessages(): void {
        this.passwordLabel = this.translationService.localizeValue('passwordLabel', 'emailchange-dialog', 'label');
        this.passwordRequiredErrorLabel = this.translationService.localizeValue('passwordRequiredErrorLabel', 'emailchange-dialog', 'label');
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'emailchange-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    save(): void {
        let emailChange = new EmailChange();
        emailChange.email = this.email;
        emailChange.password = this.emailChangeFormGroup.value.password;
        console.log(emailChange);

        this.showLoading = true;

        this.accountService.changeEmail(emailChange)
            .subscribe((result) => {
                this.showLoading = false;
                this.dialogRef.close(true);
            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;
                console.log(error.error);
                if (error.status == 400 && error.error.includes('email')) {
                    this.errorMessageLabel = this.translationService.localizeValue('duplicateEmailErrorLabel', 'emailchange-dialog', 'label');
                } else if (error.status == 400 && error.error.includes('password')) {
                    this.errorMessageLabel = this.translationService.localizeValue('emailNotChangedLabel', 'emailchange-dialog', 'label');
                } else {
                    this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'emailchange-dialog', 'label');
                }

                setTimeout(() => this.showErrorMessage = false, 10000);
            });
    }
}

export class EmailChangeData {
    email: string;
}