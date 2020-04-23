import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';

@Component({
    selector: 'detailvalidation-dialog',
    templateUrl: './detailvalidation-dialog.html',
    styleUrls: ['./detailvalidation.dialog.css']
})
export class DetailValidationDialog {

    // labels
    errorStatusLabel: string;
    successStatusLabel: string;
    nameLabel: string;
    valueLabel: string;
    noValueLabel: string;

    constructor(public dialogRef: MatDialogRef<DetailValidationDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages(): void {
        this.errorStatusLabel = this.translationService.localizeValue('errorStatusLabel', 'detailvalidation-dialog', 'label');
        this.successStatusLabel = this.translationService.localizeValue('successStatusLabel', 'detailvalidation-dialog', 'label');
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'detailvalidation-dialog', 'label');
        this.valueLabel = this.translationService.localizeValue('valueLabel', 'detailvalidation-dialog', 'label');
        this.noValueLabel = this.translationService.localizeValue('noValueLabel', 'detailvalidation-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class DetailValidationData {
    valid: boolean;
    fieldMappings: string;
}