import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthLocalService } from '../utilities/auth.service';
import { Router } from "@angular/router"
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authLocalService: AuthLocalService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authLocalService.isAuthenticated()
            .pipe(map((authenticated) => {
                if (authenticated) {
                    return true;
                }
                else {
                    let url = this.getUrl(route);
                    localStorage.setItem('bh_callback', url);

                    this.router.navigate(['/signin']);
                    return false;
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