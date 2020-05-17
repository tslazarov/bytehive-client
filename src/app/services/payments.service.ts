import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';

@Injectable()
export class PaymentsService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    getAll(): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_ALL_ENDPOINT}`, { headers, responseType: 'json' });
    }

    getAllTiers(): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');

        return this.http.get(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_TIER_ALL_ENDPOINT}`, { headers, responseType: 'json' });
    }

    getPayment(id: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.get(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_DETAIL_ENDPOINT}?id=${id}`, { headers, responseType: 'json' });
    }

    deletePayment(id: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.delete(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_DELETE_ENDPOINT}?id=${id}`, { headers, responseType: 'json' });
    }
}