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

    test() {
        let headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QG1haWwuY29tIiwianRpIjoiN2YxN2FlZmItOTFhOC00YjYwLWJhM2QtNzJiYzQ3YTk2NTQ1IiwiaWF0IjoxNTg0MzkwOTc4LCJyb2wiOiJhcGlfYWNjZXNzIiwiaWQiOiJhODhhN2VhNS0yOWQ1LTQwNmUtODMxNi0xNWNlZWRlYmIzNDgiLCJuYmYiOjE1ODQzOTA5NzcsImV4cCI6MTU4NDM5ODE3NywiaXNzIjoiYnl0ZWhpdmUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzI2LyJ9.bYH8dmPslZQkKqJOd6cDCApRnWPZNbUvB4kKF_eUu_A');
        return this.http.get(environment.apiBaseUrl + "api/users", { headers, });
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