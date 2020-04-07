import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SignupUser } from '../models/signupuser.model';
import { Constants } from '../utilities/constants';
import { SigninUser } from '../models/signinuser.model.';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';
import { SigninExternalUser } from '../models/signinexternaluser.model';
import { ResetCodeVerification } from '../models/resetcodeverification.model';
import { ResetPasswordVerification } from '../models/resetpasswordverification.model';

@Injectable()
export class AccountService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    signup(signupUser: SignupUser): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.post(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNUP_ENDPOINT}`, signupUser, { headers, responseType: 'json' });
    }

    signin(signinUser: SigninUser): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.post(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNIN_ENDPOINT}`, signinUser, { headers, responseType: 'json' });
    }

    signinExternal(signinExternalUser: SigninExternalUser): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.post(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNIN_EXTERNAL_ENDPOINT}`, signinExternalUser, { headers, responseType: 'json' });
    }

    signout() {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNOUT_ENDPOINT}`, { headers, responseType: 'json' });
    }

    resetcode(resetCodeVerification: ResetCodeVerification): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.put(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_RESET_CODE_ENDPOINT}`, resetCodeVerification, { headers, responseType: 'json' });
    }

    resetpassword(resetPasswordVerification: ResetPasswordVerification): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.put(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_RESET_PASSWORD_ENDPOINT}`, resetPasswordVerification, { headers, responseType: 'json' });
    }
}