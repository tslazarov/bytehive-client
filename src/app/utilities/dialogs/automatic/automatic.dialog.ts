import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { AutomaticMarkup } from '../../../models/automaticmarkup.model';
import { ScraperService } from '../../../services/scraper.service';

@Component({
    selector: 'automatic-dialog',
    templateUrl: './automatic-dialog.html',
    styleUrls: ['./automatic.dialog.css']
})
export class AutomaticDialog {

    output: string;
    showLoading: boolean;
    showErrorMessage: boolean;

    // labels
    expectedOutputLabel: string;
    generateLabel: string;
    saveLabel: string;
    errorMessageLabel: string;

    constructor(public dialogRef: MatDialogRef<AutomaticDialog>,
        private translationService: TranslationService,
        private scraperService: ScraperService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages(): void {
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
        let text = this.output;

        if (text == "") {
            console.log('show error');
            return;
        }

        let automaticMarkup = new AutomaticMarkup();
        automaticMarkup.url = this.data.url;
        automaticMarkup.text = text;
        automaticMarkup.scrapeLink = this.data.scrapeLink;

        this.showLoading = true;

        this.scraperService.getAutomaticMarkup(automaticMarkup)
            .subscribe((result) => {
                this.showLoading = false;

                if (result == 'non-determined') {
                    this.errorMessageLabel = this.translationService.localizeValue('nonDefinedLabel', 'automatic-dialog', 'label');
                    this.data.markup = '';
                    this.showErrorMessage = true;
                    setTimeout(() => this.showErrorMessage = false, 3000);
                }
                else if (result == 'non-unique') {
                    this.errorMessageLabel = this.translationService.localizeValue('nonUniqueLabel', 'automatic-dialog', 'label');
                    this.data.markup = '';
                    this.showErrorMessage = true;
                    setTimeout(() => this.showErrorMessage = false, 3000);
                }
                else {
                    this.data.markup = decodeURIComponent(result);
                }
            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;

                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'automatic-dialog', 'label');

                setTimeout(() => this.showErrorMessage = false, 3000);
            });
    }
}

export class AutomaticData {
    markup: string;
    url: string;
    scrapeLink: boolean;
}