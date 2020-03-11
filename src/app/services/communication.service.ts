import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExportType } from '../models/enums/exporttype.enum';
import { CrawType } from '../models/enums/crawtype.enum';

@Injectable()
export class CommunicationService {
    static emitLanguageChangeSource = new Subject<any>();
    static emitCrawTypeChangeSource = new Subject<any>();
    static emitExportTypeChangeSource = new Subject<any>();

    constructor() { }

    languageChangeEmitted = CommunicationService.emitLanguageChangeSource.asObservable();
    crawTypeChangeEmitted = CommunicationService.emitCrawTypeChangeSource.asObservable();
    exportTypeChangeEmitted = CommunicationService.emitExportTypeChangeSource.asObservable();

    emitLanguageChange(): void {
        CommunicationService.emitLanguageChangeSource.next();
    }

    emitCrawTypeChange(type: CrawType): void {
        CommunicationService.emitCrawTypeChangeSource.next(type);
    }

    emitExportTypeChange(type: ExportType): void {
        CommunicationService.emitExportTypeChangeSource.next(type);
    }
}