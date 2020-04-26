import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';
import { ScrapeType } from '../../models/enums/scrapetype.enum';

@Pipe({ name: 'scrapetypeconvert' })
export class ScrapeTypeConvertionPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {
    }

    transform(value: number, triggerUpdate: boolean): string {
        switch (value) {
            case ScrapeType.ListDetail:
                return this.translationService.localizeValue('listDetailPagesLabel', 'scrape-type', 'label');
            case ScrapeType.List:
                return this.translationService.localizeValue('listPagesLabel', 'scrape-type', 'label');
            case ScrapeType.Detail:
                return this.translationService.localizeValue('detailPagesLabel', 'scrape-type', 'label');
        }
    }
}