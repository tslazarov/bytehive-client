import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthLocalService } from './auth.service';
import { Router } from "@angular/router"
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

@Injectable()
export class AuthAdminGuardService implements CanActivate {

    constructor(private authLocalService: AuthLocalService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authLocalService.isAdministrator()
            .pipe(map((authenticated) => {
                if (authenticated) {
                    return true;
                }
                else {
                    this.router.navigate(['/forbidden']);
                    return false;
                }
            }));
    }
}