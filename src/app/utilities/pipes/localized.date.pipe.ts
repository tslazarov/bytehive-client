import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';

@Pipe({
    name: 'localizedDate',
    pure: false
})
export class LocalizedDatePipe implements PipeTransform {

    constructor(private traslationService: TranslationService) {
    }

    transform(value: any, pattern: string = 'mediumDate'): any {
        const datePipe: DatePipe = new DatePipe(this.traslationService.getLanguage());
        return datePipe.transform(value, pattern);
    }

}