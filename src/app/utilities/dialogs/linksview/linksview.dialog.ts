import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';

@Component({
    selector: 'linksview-dialog',
    templateUrl: './linksview-dialog.html',
    styleUrls: ['./linksview.dialog.css']
})
export class LinksViewDialog {

    constructor(public dialogRef: MatDialogRef<LinksViewDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class LinksViewData {
    links: string;
}