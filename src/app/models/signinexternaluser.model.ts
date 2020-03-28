import { OccupationType } from './enums/occupationtype.enum';

export class SigninExternalUser {
    email: string;
    firstName: string;
    lastName: string;
    provider: string;
    remoteIpAddress: string;
    token: string;
    occupation: OccupationType;
    defaultLanguage: number;
}