import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminGuardService } from '../services/guards/authadmin-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ScrapeRequestsComponent } from './scraperequests/scraperequests.component';

const routes: Routes = [
    { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthAdminGuardService] },
    { path: 'users', pathMatch: 'full', component: UsersComponent, canActivate: [AuthAdminGuardService] },
    { path: 'requests', pathMatch: 'full', component: ScrapeRequestsComponent, canActivate: [AuthAdminGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
