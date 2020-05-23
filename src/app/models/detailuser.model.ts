import { Occupation } from './occupation.model';
import { ListScrapeRequest } from './listscraperequest.model';
import { ListPayment } from './listpayment.model';

export class DetailUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    registrationDate: Date;
    occupation: Occupation;
    defaultLanguage: number;
    tokens: number;
    image: string;
    scrapeRequests: ListScrapeRequest[];
    payments: ListPayment[];
}