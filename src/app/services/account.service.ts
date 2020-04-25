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
import { ChangePassword } from '../models/changepassword.model';
import { ChangeSettings } from '../models/changesettings.model';
import { ChangeInformation } from '../models/changeinformation.model';

@Injectable()
export class AccountService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    getProfile(): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_PROFILE_ENDPOINT}`, { headers, responseType: 'json' });
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

    signout(): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNOUT_ENDPOINT}`, { headers, responseType: 'json' });
    }

    resetCode(resetCodeVerification: ResetCodeVerification): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.put(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_RESET_CODE_ENDPOINT}`, resetCodeVerification, { headers, responseType: 'json' });
    }

    resetPassword(resetPasswordVerification: ResetPasswordVerification): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.put(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_RESET_PASSWORD_ENDPOINT}`, resetPasswordVerification, { headers, responseType: 'json' });
    }

    changePassword(changePassword: ChangePassword): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.put(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_CHANGE_PASSWORD_ENDPOINT}`, changePassword, { headers, responseType: 'json' });
    }

    changeSettings(changeSettings: ChangeSettings): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.put(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_CHANGE_SETTINGS_ENDPOINT}`, changeSettings, { headers, responseType: 'json' });
    }

    changeInformation(changeInformation: ChangeInformation): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.put(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_CHANGE_INFORMATION_ENDPOINT}`, changeInformation, { headers, responseType: 'json' });
    }
}