import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExportType } from '../models/enums/exporttype.enum';
import { ScrapeType } from '../models/enums/scrapetype.enum';

@Injectable()
export class CommunicationService {
    static emitLanguageChangeSource = new Subject<any>();
    static emitScrapeTypeChangeSource = new Subject<any>();
    static emitExportTypeChangeSource = new Subject<any>();

    constructor() { }

    languageChangeEmitted = CommunicationService.emitLanguageChangeSource.asObservable();
    scrapeTypeChangeEmitted = CommunicationService.emitScrapeTypeChangeSource.asObservable();
    exportTypeChangeEmitted = CommunicationService.emitExportTypeChangeSource.asObservable();

    emitLanguageChange(): void {
        CommunicationService.emitLanguageChangeSource.next();
    }

    emitScrapeTypeChange(type: ScrapeType): void {
        CommunicationService.emitScrapeTypeChangeSource.next(type);
    }

    emitExportTypeChange(type: ExportType): void {
        CommunicationService.emitExportTypeChangeSource.next(type);
    }
}