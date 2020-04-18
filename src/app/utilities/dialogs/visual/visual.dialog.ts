import { Component, Inject, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { ScraperService } from '../../../services/scraper.service';
import { VisualMarkup } from '../../../models/visualmarkup.model';

@Component({
    selector: 'visual-dialog',
    templateUrl: './visual-dialog.html',
    styleUrls: ['./visual.dialog.css']
})
export class VisualDialog {
    // common
    selectedContent: any;
    loadingMarkup: boolean;

    constructor(public dialogRef: MatDialogRef<VisualDialog>,
        private chgRef: ChangeDetectorRef,
        private scraperService: ScraperService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
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
            this.loadingMarkup = true;

            this.scraperService.getVisualMarkup(visualMarkup)
                .subscribe((result) => {
                    if (result == "non-defined") {
                        console.log('show error');
                    }
                    else if (result == "non-unique") {
                        console.log('show error');
                    }
                    else {
                        this.data.markup = decodeURIComponent(result);
                    }

                    this.loadingMarkup = false;
                }, (error) => {
                    console.log(error);
                    this.loadingMarkup = false;
                });
        }
    }
}

export class VisualData {
    url: string;
    proxyUrl: string;
    markup: string;
}