import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.html',
    styleUrls: ['./code.dialog.css']
})
export class CodeDialog {

    editorOptions: any;

    // labels
    generateLabel: string;
    saveLabel: string;

    constructor(public dialogRef: MatDialogRef<CodeDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.editorOptions = { theme: 'vs-light', language: 'html' };
        this.setLabelsMessages();
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

    }
}

export class CodeData {
    markup: string;
    code: string;
}