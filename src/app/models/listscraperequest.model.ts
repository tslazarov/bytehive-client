import { OccupationType } from './enums/occupationtype.enum';
import { Occupation } from './occupation.model';

export class ListScrapeRequest {
    id: string;
    userId: string;
    email: string;
    creationDate: Date;
    downloadUrl: string;
    status: number;
}