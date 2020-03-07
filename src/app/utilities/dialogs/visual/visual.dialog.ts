import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'visual-dialog',
    templateUrl: './visual-dialog.html',
    styleUrls: ['./visual.dialog.css']
})
export class VisualDialog {

    constructor(public dialogRef: MatDialogRef<VisualDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class VisualData {
    markup: string;
}