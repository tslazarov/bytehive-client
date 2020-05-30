import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';

@Injectable()
export class FaqsService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    getAll(): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.get(`${environment.apiBaseUrl}${Constants.FAQ_SERVICE_ALL_ENDPOINT}`, { headers, responseType: 'json' });
    }

    getCategoriesAll(): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.get(`${environment.apiBaseUrl}${Constants.FAQ_SERVICE_ALL_CATEGORY_ENDPOINT}`, { headers, responseType: 'json' });
    }
}