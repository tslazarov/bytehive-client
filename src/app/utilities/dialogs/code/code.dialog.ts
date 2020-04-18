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
    loadingMarkup: boolean;

    // labels
    generateLabel: string;
    saveLabel: string;

    constructor(public dialogRef: MatDialogRef<CodeDialog>,
        private translationService: TranslationService,
        private scraperService: ScraperService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.editorOptions = { theme: 'vs-light', language: 'html' };
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
        this.loadingMarkup = true;

        this.scraperService.getCodeMarkup(codeMarkup)
            .subscribe((result) => {
                if (result == "non-defined") {
                    console.log('show error');
                }
                else if (result == "non-unique") {
                    console.log('show error');
                }
                else {
                    this.data.markup = decodeURIComponent(result);
                }

                this.loadingMarkup = false;
            }, (error) => {
                console.log(error);
                console.log('show error');

                this.loadingMarkup = false;
            });
    }
}

export class CodeData {
    url: string;
    code: string;
    markup: string;
}