import { OccupationType } from './enums/occupationtype.enum';

export class SignupUser {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    occupation: OccupationType;
    defaultLanguage: number;
}