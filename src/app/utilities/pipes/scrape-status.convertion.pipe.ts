import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';
import { RequestStatus } from '../../models/enums/requeststatus.enum';

@Pipe({ name: 'scrapestatusconvert' })
export class ScrapeStatusConvertionPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {
    }

    transform(value: number, triggerUpdate: boolean): string {
        switch (value) {
            case RequestStatus.Pending:
                return this.translationService.localizeValue('pendingStatusLabel', 'scrape-status', 'label');
            case RequestStatus.Started:
                return this.translationService.localizeValue('startedStatusLabel', 'scrape-status', 'label');
            case RequestStatus.Completed:
                return this.translationService.localizeValue('completedStatusLabel', 'scrape-status', 'label');
            case RequestStatus.Failed:
                return this.translationService.localizeValue('failedStatusLabel', 'scrape-status', 'label');
            case RequestStatus.Paid:
                return this.translationService.localizeValue('paidStatusLabel', 'scrape-status', 'label');
        }
    }
}