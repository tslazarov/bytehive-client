import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';

@Pipe({ name: 'faqconvert' })
export class FaqConvertionPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {
    }

    transform(faq: any, field: string, triggerUpdate: boolean): string {
        let language = this.translationService.getLanguage();

        if (field == 'question') {
            return language == 'en' ? faq.questionEN : faq.questionBG;
        } else if (field == 'answer') {
            return language == 'en' ? faq.answerEN : faq.answerBG;
        }

        return '';
    }
}