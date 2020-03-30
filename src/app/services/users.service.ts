import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    getAll(): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.USER_SERVICE_ALL_ENDPOINT}`, { headers, responseType: 'json' });
    }


    getUser(id: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_SIGNOUT_ENDPOINT}?id=${id}`, { headers, responseType: 'json' });
    }
}