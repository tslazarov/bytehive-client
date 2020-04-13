import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';
import { CodeMarkup } from '../models/codemarkup.model';

@Injectable()
export class ScraperService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    getCodeMarkup(codeMarkup: CodeMarkup): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.put(`${environment.apiBaseUrl}${Constants.SCRAPER_SERVICE_CODE_ENDPOINT}`, codeMarkup, { headers, responseType: 'json' });
    }
}