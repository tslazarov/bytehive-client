import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaqsService } from '../../../services/faqs.service';
import { ListFaqCategory } from '../../../models/listfaqcategory.model';
import { FaqEdit } from '../../../models/faqedit.model';

@Component({
    selector: 'faqedit-dialog',
    templateUrl: './faqedit-dialog.html',
    styleUrls: ['./faqedit.dialog.css']
})
export class FaqEditDialog {

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
    editLabel: string;
    errorMessageLabel: string;

    constructor(public dialogRef: MatDialogRef<FaqEditDialog>,
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

        this.faqFormGroup.controls['questionEN'].setValue(this.data.questionEN);
        this.faqFormGroup.controls['questionBG'].setValue(this.data.questionBG);
        this.faqFormGroup.controls['answerEN'].setValue(this.data.answerEN);
        this.faqFormGroup.controls['answerBG'].setValue(this.data.answerBG);
        this.faqFormGroup.controls['categoryId'].setValue(this.data.categoryId);

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
        this.questionEnLabel = this.translationService.localizeValue('questionEnLabel', 'faqedit-dialog', 'label');
        this.questionEnRequiredErrorLabel = this.translationService.localizeValue('questionEnRequiredErrorLabel', 'faqedit-dialog', 'label');
        this.questionBgLabel = this.translationService.localizeValue('questionBgLabel', 'faqedit-dialog', 'label');
        this.questionBgRequiredErrorLabel = this.translationService.localizeValue('questionBgRequiredErrorLabel', 'faqedit-dialog', 'label');
        this.answerEnLabel = this.translationService.localizeValue('answerEnLabel', 'faqedit-dialog', 'label');
        this.answerEnRequiredErrorLabel = this.translationService.localizeValue('answerEnRequiredErrorLabel', 'faqedit-dialog', 'label');
        this.answerBgLabel = this.translationService.localizeValue('answerBgLabel', 'faqedit-dialog', 'label');
        this.answerBgRequiredErrorLabel = this.translationService.localizeValue('answerBgRequiredErrorLabel', 'faqedit-dialog', 'label');
        this.editLabel = this.translationService.localizeValue('editLabel', 'faqedit-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    edit(): void {
        let editFaq = new FaqEdit();
        editFaq.questionEN = this.faqFormGroup.value.questionEN;
        editFaq.questionBG = this.faqFormGroup.value.questionBG;
        editFaq.answerEN = this.faqFormGroup.value.answerEN;
        editFaq.answerBG = this.faqFormGroup.value.answerBG;
        editFaq.categoryId = this.faqFormGroup.value.categoryId;

        this.showLoading = true;

        this.faqsService.editFaq(this.data.id, editFaq)
            .subscribe((result) => {
                if (result) {
                    this.showLoading = false;
                    this.dialogRef.close(true);
                }
            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;
                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'faqedit-dialog', 'label');

                setTimeout(() => this.showErrorMessage = false, 3000);
            });
    }
}

export class FaqEditData {
    id: string;
    questionEN: string;
    questionBG: string;
    answerEN: string;
    answerBG: string;
    categoryId: string;
}