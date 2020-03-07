import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.html',
    styleUrls: ['./code.dialog.css']
})
export class CodeDialog {

    editorOptions: any;
    code: string;

    constructor(public dialogRef: MatDialogRef<CodeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.editorOptions = { theme: 'vs-light', language: 'html' };
        this.code = data.markup;
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class CodeData {
    markup: string;
}