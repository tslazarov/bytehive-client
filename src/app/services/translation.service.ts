import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from '../utilities/constants';
import { LabelsMessages } from '../utilities/labels-messages';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class TranslationService {
    static language: string;

    constructor() {
        let languageKey = localStorage.getItem(Constants.LANGUAGE_KEY);

        if (languageKey) {
            TranslationService.language = languageKey;
        }
        else {
            TranslationService.language = 'bg';
        }
    }

    localizeValue(fieldName: string, pageName: string, type: string): string {
        try {
            switch (type) {
                case 'label': {
                    return TranslationService.language ? LabelsMessages.labels[pageName][fieldName][TranslationService.language] : LabelsMessages.labels[pageName][fieldName]['en'];
                }
                case 'message': {
                    return TranslationService.language ? LabelsMessages.messages[pageName][fieldName][TranslationService.language] : LabelsMessages.messages[pageName][fieldName]['en'];
                }
            }
        }
        catch {
            console.log(`Error translating field name: ${fieldName}, page name: ${pageName}`);
        }
    }

    updateLanguage() {
        let languageKey = localStorage.getItem(Constants.LANGUAGE_KEY);

        if (languageKey) {
            TranslationService.language = languageKey;
        }
        else {
            TranslationService.language = 'bg';
        }
    }

    getLanguage() {
        let languageKey = localStorage.getItem(Constants.LANGUAGE_KEY);

        return languageKey ? languageKey : 'bg';
    }
}