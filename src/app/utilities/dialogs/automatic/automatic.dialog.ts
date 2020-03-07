import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'automatic-dialog',
    templateUrl: './automatic-dialog.html',
    styleUrls: ['./automatic.dialog.css']
})
export class AutomaticDialog {

    constructor(public dialogRef: MatDialogRef<AutomaticDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class AutomaticData {
    markup: string;
}