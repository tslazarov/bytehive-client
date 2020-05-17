import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { ExportType } from '../../../models/enums/exporttype.enum';
import { ScrapeType } from '../../../models/enums/scrapetype.enum';
import { RequestStatus } from '../../../models/enums/requeststatus.enum';
import { PaymentStatus } from '../../../models/enums/paymentstatus.enum';

@Component({
    selector: 'paymentdetail-dialog',
    templateUrl: './paymentdetail-dialog.html',
    styleUrls: ['./paymentdetail.dialog.css']
})
export class PaymentDetailDialog {

    // common
    paymentData: any;

    // labels
    fromLabel: string;
    statusLabel: string;
    currencyLabel: string;
    providerLabel: string;
    externalIdLabel: string;
    nameLabel: string;
    skuLabel: string;
    priceLabel: string;
    valueLabel: string;
    pollenLabel: string;

    constructor(public dialogRef: MatDialogRef<PaymentDetailDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.paymentData = data;
    }

    setLabelsMessages(): void {
        this.fromLabel = this.translationService.localizeValue('fromLabel', 'paymentdetail-dialog', 'label');
        this.statusLabel = this.translationService.localizeValue('statusLabel', 'paymentdetail-dialog', 'label');
        this.currencyLabel = this.translationService.localizeValue('currencyLabel', 'paymentdetail-dialog', 'label');
        this.providerLabel = this.translationService.localizeValue('providerLabel', 'paymentdetail-dialog', 'label');
        this.externalIdLabel = this.translationService.localizeValue('externalIdLabel', 'paymentdetail-dialog', 'label');
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'paymentdetail-dialog', 'label');
        this.skuLabel = this.translationService.localizeValue('skuLabel', 'paymentdetail-dialog', 'label');
        this.priceLabel = this.translationService.localizeValue('priceLabel', 'paymentdetail-dialog', 'label');
        this.valueLabel = this.translationService.localizeValue('valueLabel', 'paymentdetail-dialog', 'label');
        this.pollenLabel = this.translationService.localizeValue('pollenLabel', 'paymentdetail-dialog', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class PaymentDetailData {
    id: string;
    creationDate: Date;
    userId: string;
    email: string;
    externalId: string;
    provider: string;
    status: PaymentStatus;
    price: number;
    tierName: string;
    tierValue: number;
    tierSku: string;
}