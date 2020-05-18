import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';

@Component({
    selector: 'sharelink-dialog',
    templateUrl: './sharelink-dialog.html',
    styleUrls: ['./sharelink.dialog.css']
})
export class ShareLinkDialog {

    constructor(public dialogRef: MatDialogRef<ShareLinkDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    close(): void {
        this.dialogRef.close();
    }

    copyClipboard(inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
    }
}

export class ShareLinkData {
    downloadLink: string;
}