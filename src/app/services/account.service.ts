import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SignupUser } from '../models/signupuser.model';
import { Constants } from '../utilities/constants';
import { SigninUser } from '../models/signinuser.model.';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';

@Injectable()
export class AccountService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    signup(signupUser: SignupUser): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.post(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNOUT_ENDPOINT}`, signupUser, { headers, responseType: 'json' });
    }

    signin(siginpUser: SigninUser): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.post(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNIN_ENDPOINT}`, siginpUser, { headers, responseType: 'json' });
    }

    signout() {
        debugger;
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);
        console.log(headers);
        return this.http.get(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNOUT_ENDPOINT}`, { headers, responseType: 'json' });
    }
}