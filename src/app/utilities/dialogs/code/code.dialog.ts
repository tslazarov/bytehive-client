import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { CodeMarkup } from '../../../models/codemarkup.model';
import { ScraperService } from '../../../services/scraper.service';

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.html',
    styleUrls: ['./code.dialog.css']
})
export class CodeDialog {

    editor: any;
    editorOptions: any;
    showLoading: boolean;
    showErrorMessage: boolean;

    // labels
    generateLabel: string;
    saveLabel: string;
    errorMessageLabel: string;

    constructor(public dialogRef: MatDialogRef<CodeDialog>,
        private translationService: TranslationService,
        private scraperService: ScraperService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.editorOptions = { theme: 'vs-light', language: 'html', readOnly: true };
        this.setLabelsMessages();
    }

    onInit(editor) {
        this.editor = editor;
    }

    setLabelsMessages(): void {
        this.generateLabel = this.translationService.localizeValue('generateLabel', 'code-dialog', 'label');
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'code-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.dialogRef.close(this.data);
    }

    generate(): void {
        let line = this.editor.getSelection().startLineNumber;
        let text = this.editor.getModel().getValueInRange(this.editor.getSelection());

        if (text == "") {
            console.log('show error');
            return;
        }

        let codeMarkup = new CodeMarkup();
        codeMarkup.url = this.data.url;
        codeMarkup.line = this.editor.getSelection().startLineNumber;
        codeMarkup.text = this.editor.getModel().getValueInRange(this.editor.getSelection());
        codeMarkup.scrapeLink = this.data.scrapeLink;

        this.showLoading = true;

        this.scraperService.getCodeMarkup(codeMarkup)
            .subscribe((result) => {
                this.showLoading = false;

                if (result == 'non-determined') {
                    this.errorMessageLabel = this.translationService.localizeValue('nonDefinedLabel', 'code-dialog', 'label');
                    this.data.markup = '';
                    this.showErrorMessage = true;
                    setTimeout(() => this.showErrorMessage = false, 3000);
                }
                else if (result == 'non-unique') {
                    this.errorMessageLabel = this.translationService.localizeValue('nonUniqueLabel', 'code-dialog', 'label');
                    this.data.markup = '';
                    this.showErrorMessage = true;
                    setTimeout(() => this.showErrorMessage = false, 3000);
                }
                else {
                    this.data.markup = decodeURIComponent(result);
                }

            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;

                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'code-dialog', 'label');

                setTimeout(() => this.showErrorMessage = false, 3000);
            });
    }
}

export class CodeData {
    url: string;
    code: string;
    markup: string;
    scrapeLink: boolean;
}