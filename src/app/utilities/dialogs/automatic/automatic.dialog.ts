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
    loadingMarkup: boolean;

    // labels
    expectedOutputLabel: string;
    generateLabel: string;
    saveLabel: string;

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

        this.loadingMarkup = true;

        this.scraperService.getAutomaticMarkup(automaticMarkup)
            .subscribe((result) => {
                if (result == "non-defined") {
                    console.log('show error');
                }
                else {
                    this.data.markup = decodeURIComponent(result);
                }

                this.loadingMarkup = false;
            }, (error) => {
                console.log(error);
                console.log('show error');
                this.loadingMarkup = false;
            });
    }
}

export class AutomaticData {
    markup: string;
    url: string;
}