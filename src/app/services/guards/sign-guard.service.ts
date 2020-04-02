import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthLocalService } from '../utilities/auth.service';
import { Router } from "@angular/router"
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SignGuardService implements CanActivate {

    constructor(private authLocalService: AuthLocalService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authLocalService.isAuthenticated()
            .pipe(map((authenticated) => {
                if (authenticated) {
                    this.router.navigate(['/']);
                    return false;
                }
                else {
                    return true;
                }
            }));
    }

    getUrl(route: ActivatedRouteSnapshot): string {
        return route.pathFromRoot
            .filter(v => v.routeConfig)
            .map(v => v.routeConfig!.path)
            .join('/');
    }
}