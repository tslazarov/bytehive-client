import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SignupUser } from '../models/signupuser.model';
import { Constants } from '../utilities/constants';
import { SigninUser } from '../models/signinuser.model.';

@Injectable()
export class AccountService {

    baseEndpoint: string;
    signupEndpoint: string;
    signinEndpoint: string;

    constructor(private http: HttpClient) {
        this.baseEndpoint = environment.apiBaseUrl + Constants.ACCOUNT_SERVICE_BASE_ENDPOINT;
        this.signupEndpoint = environment.apiBaseUrl + Constants.ACCOUNT_SERVICE_SIGNUP_ENDPOINT;
        this.signinEndpoint = environment.apiBaseUrl + Constants.ACCOUNT_SERVICE_SIGNIN_ENDPOINT;
    }

    signup(signupUser: SignupUser): Observable<any> {
        let headers = this.setContentTypeHeader('json');

        return this.http.post(this.signupEndpoint, signupUser, { headers, responseType: 'json' });
    }

    signin(siginpUser: SigninUser): Observable<any> {
        let headers = this.setContentTypeHeader('json');

        return this.http.post(this.signinEndpoint, siginpUser, { headers, responseType: 'json' });
    }

    setContentTypeHeader(type: string): HttpHeaders {
        let contentType;

        switch (type) {
            case 'text':
                contentType = 'text/plain; charset=utf-8';
                break;
            case 'json':
                contentType = 'application/json';
                break;
            default:
                contentType = 'application/json';

        }

        return new HttpHeaders().set('Content-Type', contentType);
    }
}