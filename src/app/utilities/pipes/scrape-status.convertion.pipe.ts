import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';

@Pipe({ name: 'scrapestatusconvert' })
export class ScrapeStatusConvertionPipe implements PipeTransform {

    regions: string[] = ["center", "no-center", "outskirts", "outside"];

    constructor(private translationService: TranslationService) {
    }

    transform(value: number, triggerUpdate: boolean): string {
        switch (value) {
            case 0:
                return this.translationService.localizeValue('pendingStatusLabel', 'scrape-status', 'label');
            case 1:
                return this.translationService.localizeValue('startedStatusLabel', 'scrape-status', 'label');
            case 2:
                return this.translationService.localizeValue('completedStatusLabel', 'scrape-status', 'label');
            case 3:
                return this.translationService.localizeValue('failedStatusLabel', 'scrape-status', 'label');
            case 4:
                return this.translationService.localizeValue('paidStatusLabel', 'scrape-status', 'label');
        }
    }
}