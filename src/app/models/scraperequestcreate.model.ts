import { OccupationType } from './enums/occupationtype.enum';
import { Occupation } from './occupation.model';
import { ScrapeType } from './enums/scrapetype.enum';
import { ExportType } from './enums/exporttype.enum';
import { FieldMapping } from './fieldmapping.model';

export class ScrapeRequestCreate {
    scrapeType: ScrapeType;
    exportType: ExportType;
    listUrl: string;
    hasPaging: boolean;
    startPage: number;
    endPage: number;
    detailMarkup: string;
    detailUrls: string[];
    fieldMappings: FieldMapping[];
}