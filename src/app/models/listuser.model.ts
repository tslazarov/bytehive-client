import { OccupationType } from './enums/occupationtype.enum';
import { Occupation } from './occupation.model';

export class ListUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    provider: string;
    registrationDate: Date;
    totalRequests: number;
    occupation: Occupation;
}