import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from "@angular/router"
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthenticated()
            .pipe(map((authenticated) => {
                console.log(authenticated);
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