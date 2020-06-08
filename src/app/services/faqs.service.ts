import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';
import { FaqCreate } from '../models/faqcreate.model';
import { FaqEdit } from '../models/faqedit.model';

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

    getFaq(id: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.FAQ_SERVICE_DETAIL_ENDPOINT}/${id}`, { headers, responseType: 'json' });
    }

    createFaq(faq: FaqCreate): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.post(`${environment.apiBaseUrl}${Constants.FAQ_SERVICE_CREATE_ENDPOINT}`, faq, { headers, responseType: 'json' });
    }

    editFaq(id: string, faq: FaqEdit): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.put(`${environment.apiBaseUrl}${Constants.FAQ_SERVICE_EDIT_ENDPOINT}/${id}`, faq, { headers, responseType: 'json' });
    }

    deleteFaq(id: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.delete(`${environment.apiBaseUrl}${Constants.FAQ_SERVICE_DELETE_ENDPOINT}/${id}`, { headers, responseType: 'json' });
    }
}