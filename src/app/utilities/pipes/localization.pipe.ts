import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';

@Pipe({ name: 'localize' })
export class LocalizationPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {
    }

    transform(value: string, fieldName: string, pageName: string, type: string): string {
        return this.translationService.localizeValue(fieldName, pageName, type);
    }
}