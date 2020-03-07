import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'automatic-dialog',
    templateUrl: './automatic-dialog.html',
    styleUrls: ['./automatic.dialog.css']
})
export class AutomaticDialog {
    output: string;

    // labels
    expectedOutputLabel: string;
    generateLabel: string;
    saveLabel: string;

    constructor(public dialogRef: MatDialogRef<AutomaticDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages() {
        this.expectedOutputLabel = this.translationService.localizeValue('expectedOutputLabel', 'automatic-dialog', 'label');
        this.generateLabel = this.translationService.localizeValue('generateLabel', 'automatic-dialog', 'label');
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'automatic-dialog', 'label');
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

export class AutomaticData {
    markup: string;
}