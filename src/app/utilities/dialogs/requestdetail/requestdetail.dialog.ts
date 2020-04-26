import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { ExportType } from '../../../models/enums/exporttype.enum';
import { ScrapeType } from '../../../models/enums/scrapetype.enum';
import { RequestStatus } from '../../../models/enums/requeststatus.enum';

@Component({
    selector: 'requestdetail-dialog',
    templateUrl: './requestdetail-dialog.html',
    styleUrls: ['./requestdetail.dialog.css']
})
export class RequestDetailDialog {

    // common
    requestData: any;

    // labels
    fromLabel: string;
    statusLabel: string;
    scrapeTypeLabel: string;
    exportTypeLabel: string;
    listUrlLabel: string;
    startPageLabel: string;
    endPageLabel: string;
    detailMarkupLabel: string;
    detailLinksCountLabel: string;
    dataMappingLabel: string;
    nameLabel: string;
    markupLabel: string;

    constructor(public dialogRef: MatDialogRef<RequestDetailDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.requestData = JSON.parse(data.data);
    }

    setLabelsMessages(): void {
        this.fromLabel = this.translationService.localizeValue('fromLabel', 'requestdetail-dialog', 'label');
        this.statusLabel = this.translationService.localizeValue('statusLabel', 'requestdetail-dialog', 'label');
        this.scrapeTypeLabel = this.translationService.localizeValue('scrapeTypeLabel', 'requestdetail-dialog', 'label');
        this.exportTypeLabel = this.translationService.localizeValue('exportTypeLabel', 'requestdetail-dialog', 'label');
        this.listUrlLabel = this.translationService.localizeValue('listUrlLabel', 'requestdetail-dialog', 'label');
        this.startPageLabel = this.translationService.localizeValue('startPageLabel', 'requestdetail-dialog', 'label');
        this.endPageLabel = this.translationService.localizeValue('endPageLabel', 'requestdetail-dialog', 'label');
        this.detailMarkupLabel = this.translationService.localizeValue('detailMarkupLabel', 'requestdetail-dialog', 'label');
        this.detailLinksCountLabel = this.translationService.localizeValue('detailLinksCountLabel', 'requestdetail-dialog', 'label');
        this.dataMappingLabel = this.translationService.localizeValue('dataMappingLabel', 'requestdetail-dialog', 'label');
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'requestdetail-dialog', 'label');
        this.markupLabel = this.translationService.localizeValue('markupLabel', 'requestdetail-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class RequestDetailData {
    id: string;
    creationDate: Date;
    data: string;
    downloadUrl: string;
    email: string;
    exportType: ExportType;
    scrapeType: ScrapeType;
    status: RequestStatus;
}