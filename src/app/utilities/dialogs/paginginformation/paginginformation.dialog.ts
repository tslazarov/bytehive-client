import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'paginginformation-dialog',
    templateUrl: './paginginformation-dialog.html',
    styleUrls: ['./paginginformation.dialog.css']
})
export class PagingInformationDialog {

    // labels
    pagePlaceholderLabel: string;
    examplesLabel: string;
    example1Label: string;
    example2Label: string;

    constructor(public dialogRef: MatDialogRef<PagingInformationDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages(): void {
        this.pagePlaceholderLabel = this.translationService.localizeValue('pagePlaceholderLabel', 'pageinformation-dialog', 'label');
        this.examplesLabel = this.translationService.localizeValue('examplesLabel', 'pageinformation-dialog', 'label');
        this.example1Label = this.translationService.localizeValue('example1Label', 'pageinformation-dialog', 'label');
        this.example2Label = this.translationService.localizeValue('example2Label', 'pageinformation-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }
}