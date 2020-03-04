import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommunicationService {
    static emitLanguageChangeSource = new Subject<any>();

    constructor() { }

    languageChangeEmitted = CommunicationService.emitLanguageChangeSource.asObservable();

    emitLanguageChange() {
        CommunicationService.emitLanguageChangeSource.next();
    }
}