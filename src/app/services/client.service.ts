import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';

@Injectable()
export class ClientService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) { }

    getPageMarkup(url: string, sanitize): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'text');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        // return this.http.get(url, { headers, responseType: 'text' });
        return this.http.get(`${environment.apiBaseUrl}${Constants.SCRAPER_SERVICE_MARKUP_ENDPOINT}?sanitize=${sanitize}&url=${url}`, { headers, responseType: 'text' });
    }
}