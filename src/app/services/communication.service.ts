import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CommunicationService {
    static emitLanguageChangeSource = new Subject<any>();

    constructor() { }

    languageChangeEmitted = CommunicationService.emitLanguageChangeSource.asObservable();

    emitLanguageChange(): void {
        CommunicationService.emitLanguageChangeSource.next();
    }
}