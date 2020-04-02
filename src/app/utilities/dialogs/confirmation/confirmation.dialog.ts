import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';

@Component({
    selector: 'confirmation-dialog',
    templateUrl: './confirmation-dialog.html',
    styleUrls: ['./confirmation.dialog.css']
})
export class ConfirmationDialog {

    // labels
    confirmLabel: string;
    cancelLabel: string;

    constructor(public dialogRef: MatDialogRef<ConfirmationDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages(): void {
        this.confirmLabel = this.translationService.localizeValue('confirmLabel', 'confirmation-dialog', 'label');
        this.cancelLabel = this.translationService.localizeValue('cancelLabel', 'confirmation-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        this.dialogRef.close(true);
    }
}

export class ConfirmationData {
    message: string;
}