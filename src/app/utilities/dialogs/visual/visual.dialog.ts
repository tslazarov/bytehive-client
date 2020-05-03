import { Component, Inject, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { ScraperService } from '../../../services/scraper.service';
import { VisualMarkup } from '../../../models/visualmarkup.model';
import { TranslationService } from '../../../services/utilities/translation.service';

@Component({
    selector: 'visual-dialog',
    templateUrl: './visual-dialog.html',
    styleUrls: ['./visual.dialog.css']
})
export class VisualDialog {
    // common
    selectedContent: any;
    loadingMarkup: boolean;
    showLoading: boolean;
    showErrorMessage: boolean;

    // labels
    saveLabel: string;
    errorMessageLabel: string;

    constructor(public dialogRef: MatDialogRef<VisualDialog>,
        private chgRef: ChangeDetectorRef,
        private scraperService: ScraperService,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages(): void {
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'visual-dialog', 'label');
    }

    save() {
        this.dialogRef.close(this.data);
    }

    close(): void {
        this.dialogRef.close();
    }

    selectionChange(selection: any) {

        if (selection && selection.text && selection.element) {
            let visualMarkup = new VisualMarkup();
            visualMarkup.url = this.data.url;
            visualMarkup.text = selection.text;
            visualMarkup.element = selection.element;
            visualMarkup.elementName = selection.elementName;
            visualMarkup.scrapeLink = this.data.scrapeLink;
            visualMarkup.isUnique = this.data.isUnique;

            this.showLoading = true;

            this.scraperService.getVisualMarkup(visualMarkup)
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
}

export class VisualData {
    url: string;
    proxyUrl: string;
    markup: string;
    scrapeLink: boolean;
    isUnique: boolean;
}