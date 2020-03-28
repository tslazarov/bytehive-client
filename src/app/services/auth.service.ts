import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthLocalService {

    constructor(private router: Router) { }

    getToken(): string {
        let token = localStorage.getItem('bh_auth_token');

        if (token) {
            let decodedToken = jwt_decode(token);
            let expirationDate = decodedToken.exp * 1000;

            if (expirationDate < Date.now()) {
                this.refreshToken();
            }
            else {
                return token;
            }
        }

        return "";
    }

    signin(result: any): void {
        localStorage.setItem('bh_auth_token', result.accessToken.token);
        localStorage.setItem('bh_refresh_token', result.refreshToken);
    }

    signout(): void {
        localStorage.removeItem('bh_auth_token');
        localStorage.removeItem('bh_refresh_token');
    }

    refreshToken() {
        // TODO: Request refresh token
        console.log('send refresh token');
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
            let token = this.getToken();

            return token ? observer.next(true) : observer.next(false);
        });
    }

    isAdministrator(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            let token = this.getToken();

            if (token) {
                let decodedToken = jwt_decode(token);

                if (decodedToken.role && decodedToken.role.includes('Administrator')) {
                    return observer.next(true);
                }

            }

            return observer.next(false);
        });
    }
}