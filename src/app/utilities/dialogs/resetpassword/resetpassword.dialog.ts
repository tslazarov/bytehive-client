import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BhValidators } from '../../validators/bhvalidators';
import { AccountService } from '../../../services/account.service';
import { ResetCodeVerification } from '../../../models/resetcodeverification.model';

@Component({
    selector: 'resetpassword-dialog',
    templateUrl: './resetpassword-dialog.html',
    styleUrls: ['./resetpassword.dialog.css']
})
export class ResetPasswordDialog {

    // labels
    emailLabel: string;
    sendCodeLabel: string;
    savePasswordLabel: string;

    resetCodeFormGroup: FormGroup;
    resetPasswordFormGroup: FormGroup;


    constructor(public dialogRef: MatDialogRef<ResetPasswordDialog>,
        private translationService: TranslationService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();

        this.resetCodeFormGroup = this.formBuilder.group({
            email: ['', [Validators.required]]
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
        this.sendCodeLabel = this.translationService.localizeValue('sendCodeLabel', 'resetpassword-dialog', 'label');
        this.savePasswordLabel = this.translationService.localizeValue('savePasswordLabel', 'resetpassword-dialog', 'label');
    }

    sendCode(): void {
        let resetCodeVerification = new ResetCodeVerification();
        resetCodeVerification.email = this.resetCodeFormGroup.value.email;

        this.accountService.resetcode(resetCodeVerification)
            .subscribe((result) => {
                console.log(result);
                // TODO: change view
            }, (error) => {
            });
    }
}

export class ResetPasswordData {
    status: boolean;
}