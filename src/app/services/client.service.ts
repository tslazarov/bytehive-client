import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {

    constructor(private http: HttpClient) { }

    getPageMarkup(url: string): Observable<any> {
        let headers = this.setContentTypeHeader('text');

        return this.http.get(url, { headers, responseType: 'text' });
    }

    setContentTypeHeader(type: string): HttpHeaders {
        let contentType;

        switch (type) {
            case 'text':
                contentType = 'text/plain; charset=utf-8';
                break;
            case 'json':
                contentType = 'application/json';
                break;
            default:
                contentType = 'application/json';

        }

        return new HttpHeaders().set('Content-Type', contentType);
    }
}