import { OccupationType } from './enums/occupationtype.enum';
import { Occupation } from './occupation.model';

export class ListPayment {
    id: string;
    userId: string;
    email: string;
    creationDate: Date;
    externalId: string;
    provider: string;
    price: number;
    status: number;
}