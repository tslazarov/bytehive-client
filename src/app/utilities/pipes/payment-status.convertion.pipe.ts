import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';
import { PaymentStatus } from '../../models/enums/paymentstatus.enum';

@Pipe({ name: 'paymentstatusconvert' })
export class PaymentStatusConvertionPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {
    }

    transform(value: number, triggerUpdate: boolean): string {
        switch (value) {
            case PaymentStatus.Pending:
                return this.translationService.localizeValue('pendingStatusLabel', 'payment-status', 'label');
            case PaymentStatus.Completed:
                return this.translationService.localizeValue('completedStatusLabel', 'payment-status', 'label');
            case PaymentStatus.Cancelled:
                return this.translationService.localizeValue('cancelledStatusLabel', 'payment-status', 'label');
            case PaymentStatus.Failed:
                return this.translationService.localizeValue('failedStatusLabel', 'payment-status', 'label');
        }
    }
}