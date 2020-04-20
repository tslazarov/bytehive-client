import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../utilities/constants';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';
import { CodeMarkup } from '../models/codemarkup.model';
import { AutomaticMarkup } from '../models/automaticmarkup.model';
import { VisualMarkup } from '../models/visualmarkup.model';
import { ScrapeRequestCreate } from '../models/scraperequestcreate.model';

@Injectable()
export class ScrapeRequestsService {

    constructor(private http: HttpClient,
        private httpHeaderHelper: HttpHeaderHelper) {
    }

    createScrapeRequest(scrapeRequest: ScrapeRequestCreate): Observable<any> {
        let headers = new HttpHeaders();
        headers = this.httpHeaderHelper.setContentTypeHeader(headers, 'json');
        headers = this.httpHeaderHelper.setAuthorizationHeader(headers);

        return this.http.post(`${environment.apiBaseUrl}${Constants.SCRAPE_REQUEST_SERVICE_CREATE_ENDPOINT}`, scrapeRequest, { headers, responseType: 'json' });
    }
}