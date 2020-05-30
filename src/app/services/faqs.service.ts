import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';
import { FaqCreate } from '../models/faqcreate.model';

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

    createFaq(faq: FaqCreate): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.post(`${environment.apiBaseUrl}${Constants.FAQ_SERVICE_CREATE_ENDPOINT}`, faq, { headers, responseType: 'json' });
    }
}