import { HttpHeaders } from '@angular/common/http';

export class HttpHeaderHelper {

    constructor() {
    }

    setContentTypeHeader(headers: HttpHeaders, type: string): HttpHeaders {
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

        return headers.append('Content-Type', contentType);
    }

    setAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
        let token = localStorage.getItem('bh_auth_token');

        return headers.append('Authorization', `Bearer ${token}`);
    }
}