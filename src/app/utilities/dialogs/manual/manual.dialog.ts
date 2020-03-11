import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'manual-dialog',
    templateUrl: './manual-dialog.html',
    styleUrls: ['./manual.dialog.css']
})
export class ManualDialog {

    // labels
    markupPlaceholderLabel: string;
    markupHeaderLabel: string;
    syntaxRulesLabel: string;
    ruleHeaderLabel: string;
    markup1Label: string;
    rule1Label: string;
    markup2Label: string;
    rule2Label: string;
    markup3Label: string;
    rule3Label: string;
    markup4Label: string;
    rule4Label: string;
    saveLabel: string;

    constructor(public dialogRef: MatDialogRef<ManualDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages(): void {
        this.markupPlaceholderLabel = this.translationService.localizeValue('markupPlaceholderLabel', 'manual-dialog', 'label');
        this.markupHeaderLabel = this.translationService.localizeValue('markupHeaderLabel', 'manual-dialog', 'label');
        this.syntaxRulesLabel = this.translationService.localizeValue('syntaxRulesLabel', 'manual-dialog', 'label');
        this.ruleHeaderLabel = this.translationService.localizeValue('ruleHeaderLabel', 'manual-dialog', 'label');
        this.markup1Label = this.translationService.localizeValue('markup1Label', 'manual-dialog', 'label');
        this.rule1Label = this.translationService.localizeValue('rule1Label', 'manual-dialog', 'label');
        this.markup2Label = this.translationService.localizeValue('markup2Label', 'manual-dialog', 'label');
        this.rule2Label = this.translationService.localizeValue('rule2Label', 'manual-dialog', 'label');
        this.markup3Label = this.translationService.localizeValue('markup3Label', 'manual-dialog', 'label');
        this.rule3Label = this.translationService.localizeValue('rule3Label', 'manual-dialog', 'label');
        this.markup4Label = this.translationService.localizeValue('markup4Label', 'manual-dialog', 'label');
        this.rule4Label = this.translationService.localizeValue('rule4Label', 'manual-dialog', 'label');
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'manual-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.dialogRef.close(this.data);
    }
}

export class ManualData {
    markup: string;
}