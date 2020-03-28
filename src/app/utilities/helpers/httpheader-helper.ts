import { HttpHeaders } from '@angular/common/http';
import { AuthLocalService } from '../../services/auth.service';

export class HttpHeaderHelper {

    constructor(private authLocalService: AuthLocalService) {
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
        let token = this.authLocalService.getToken();

        return headers.append('Authorization', `Bearer ${token}`);
    }
}