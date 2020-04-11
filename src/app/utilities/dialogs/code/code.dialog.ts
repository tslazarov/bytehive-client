import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { CodeMarkup } from '../../../models/codemarkup.model';
import { ScrapperService } from '../../../services/scrapper.service';

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.html',
    styleUrls: ['./code.dialog.css']
})
export class CodeDialog {

    editor: any;
    editorOptions: any;

    // labels
    generateLabel: string;
    saveLabel: string;

    constructor(public dialogRef: MatDialogRef<CodeDialog>,
        private translationService: TranslationService,
        private scrapperService: ScrapperService,
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
        let codeMarkup = new CodeMarkup();
        codeMarkup.url = this.data.url;
        codeMarkup.line = this.editor.getSelection().startLineNumber;
        codeMarkup.text = this.editor.getModel().getValueInRange(this.editor.getSelection());

        this.scrapperService.getCodeMarkup(codeMarkup)
            .subscribe((result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            });
    }
}

export class CodeData {
    url: string;
    code: string;
    markup: string;
}