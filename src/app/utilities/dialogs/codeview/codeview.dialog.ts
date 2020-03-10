import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'codeview-dialog',
    templateUrl: './codeview-dialog.html',
    styleUrls: ['./codeview.dialog.css']
})
export class CodeViewDialog {

    editorOptions: any;
    code: string;

    constructor(public dialogRef: MatDialogRef<CodeViewDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.editorOptions = { theme: 'vs-light', language: 'html' };
        this.code = data.markup;
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class CodeViewData {
    markup: string;
}