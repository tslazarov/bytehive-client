import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BhValidators } from '../../validators/bhvalidators';
import { AccountService } from '../../../services/account.service';
import { ResetCodeVerification } from '../../../models/resetcodeverification.model';
import { ResetPasswordVerification } from '../../../models/resetpasswordverification.model';
import { FaqCreate } from '../../../models/faqcreate.model';
import { FaqsService } from '../../../services/faqs.service';
import { ListFaqCategory } from '../../../models/listfaqcategory.model';

@Component({
    selector: 'faqcreate-dialog',
    templateUrl: './faqcreate-dialog.html',
    styleUrls: ['./faqcreate.dialog.css']
})
export class FaqCreateDialog {

    showLoading: boolean;
    showErrorMessage: boolean;

    faqCategories: ListFaqCategory[];
    faqFormGroup: FormGroup;

    // labels
    questionEnLabel: string;
    questionEnRequiredErrorLabel: string;
    questionBgLabel: string;
    questionBgRequiredErrorLabel: string;
    answerEnLabel: string;
    answerEnRequiredErrorLabel: string;
    answerBgLabel: string;
    answerBgRequiredErrorLabel: string;
    createLabel: string;
    errorMessageLabel: string;

    constructor(public dialogRef: MatDialogRef<FaqCreateDialog>,
        private translationService: TranslationService,
        private faqsService: FaqsService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();

        this.showLoading = false;

        this.faqFormGroup = this.formBuilder.group({
            questionEN: ['', [Validators.required]],
            questionBG: ['', [Validators.required]],
            answerEN: ['', [Validators.required]],
            answerBG: ['', [Validators.required]],
            categoryId: ['', [Validators.required]]
        });
        this.faqCategories = [];

        this.faqsService.getCategoriesAll()
            .subscribe(result => {
                result.forEach(faqCategory => {
                    var listFaqCategory = faqCategory as ListFaqCategory;
                    this.faqCategories.push(listFaqCategory);
                });
            })
    }

    setLabelsMessages(): void {
        this.questionEnLabel = this.translationService.localizeValue('questionEnLabel', 'faqcreate-dialog', 'label');
        this.questionEnRequiredErrorLabel = this.translationService.localizeValue('questionEnRequiredErrorLabel', 'faqcreate-dialog', 'label');
        this.questionBgLabel = this.translationService.localizeValue('questionBgLabel', 'faqcreate-dialog', 'label');
        this.questionBgRequiredErrorLabel = this.translationService.localizeValue('questionBgRequiredErrorLabel', 'faqcreate-dialog', 'label');
        this.answerEnLabel = this.translationService.localizeValue('answerEnLabel', 'faqcreate-dialog', 'label');
        this.answerEnRequiredErrorLabel = this.translationService.localizeValue('answerEnRequiredErrorLabel', 'faqcreate-dialog', 'label');
        this.answerBgLabel = this.translationService.localizeValue('answerBgLabel', 'faqcreate-dialog', 'label');
        this.answerBgRequiredErrorLabel = this.translationService.localizeValue('answerBgRequiredErrorLabel', 'faqcreate-dialog', 'label');
        this.createLabel = this.translationService.localizeValue('createLabel', 'faqcreate-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    create(): void {
        let createFaq = new FaqCreate();
        createFaq.questionEN = this.faqFormGroup.value.questionEN;
        createFaq.questionBG = this.faqFormGroup.value.questionBG;
        createFaq.answerEN = this.faqFormGroup.value.answerEN;
        createFaq.answerBG = this.faqFormGroup.value.answerBG;
        createFaq.categoryId = this.faqFormGroup.value.categoryId;

        this.showLoading = true;

        this.faqsService.createFaq(createFaq)
            .subscribe((result) => {
                if (result) {
                    this.showLoading = false;
                    this.dialogRef.close(true);
                }
            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;
                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'faqcreate-dialog', 'label');

                setTimeout(() => this.showErrorMessage = false, 3000);
            });
    }
}