import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { first } from 'rxjs/operators';
import { RefreshToken } from '../models/refreshtoken.model';
import { CommunicationService } from './communication.service';

@Injectable()
export class AuthLocalService {

    constructor(private router: Router,
        private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper,
        private communicationService: CommunicationService) { }

    getToken(): Observable<string> {
        return new Observable<string>(observer => {
            let token = localStorage.getItem('bh_auth_token');
            let refreshToken = localStorage.getItem('bh_refresh_token');

            if (token) {
                let decodedToken = jwt_decode(token);
                let expirationDate = decodedToken.exp * 1000;

                if (expirationDate < Date.now()) {
                    if (refreshToken) {
                        this.refreshToken(refreshToken).pipe(first())
                            .subscribe((result: string) => {
                                if (result) {
                                    this.signin(result);
                                    observer.next(result);
                                }
                                else {
                                    this.signout();
                                }
                            }, (err) => {
                                this.signout();
                                observer.next('');
                            });
                    }
                    else {
                        observer.next('');
                    }
                }
                else {
                    observer.next(token);
                }
            }
            else {
                observer.next('');
            }
        });
    }

    signin(result: any): void {
        localStorage.setItem('bh_auth_token', result.accessToken.token);
        localStorage.setItem('bh_refresh_token', result.refreshToken.token);
    }

    signout(): void {
        localStorage.removeItem('bh_auth_token');
        localStorage.removeItem('bh_refresh_token');
        this.communicationService.emitAuthenticationChange();
    }

    refreshToken(refreshTokenValue: string) {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        let refreshToken = new RefreshToken();
        refreshToken.token = refreshTokenValue;

        return this.http.post(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_REFRESH_TOKEN_ENDPOINT}`, refreshToken, { headers, responseType: 'json' });
    }

    getClaim(claimName: string): string {
        let token = localStorage.getItem('bh_auth_token');

        if (token) {
            let decodedToken = jwt_decode(token);

            return decodedToken[claimName];
        }

        return "";
    }

    isAuthenticated(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.getToken()
                .pipe(first())
                .subscribe((token) => {
                    if (token) {
                        observer.next(true);
                    }
                    else {
                        observer.next(false);
                    }
                });
        });
    }

    isAdministrator(): Observable<boolean> {
        return new Observable<boolean>(observer => {

            this.getToken()
                .pipe(first())
                .subscribe((token) => {
                    if (token) {
                        let decodedToken = jwt_decode(token);

                        if (decodedToken.role && decodedToken.role.includes('Administrator')) {
                            return observer.next(true);
                        }
                    }

                    return observer.next(false);
                });
        });
    }
}