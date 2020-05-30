import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';

@Pipe({ name: 'faqcategoryconvert' })
export class FaqCategoryConvertionPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {
    }

    transform(category: any, triggerUpdate: boolean): string {
        let language = this.translationService.getLanguage();

        return language == 'en' ? category.nameEN : category.nameBG;
    }
}