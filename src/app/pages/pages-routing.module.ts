import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HiveComponent } from './hive/hive.component';
import { FaqComponent } from './faq/faq.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from '../services/guards/auth-guard.service';
import { SignGuardService } from '../services/guards/sign-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ProxyComponent } from './proxy/proxy.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'hive', pathMatch: 'full', component: HiveComponent, canActivate: [AuthGuardService] },
    { path: 'faq', pathMatch: 'full', component: FaqComponent },
    { path: 'proxy', pathMatch: 'full', component: ProxyComponent },
    { path: 'signin', pathMatch: 'full', component: SigninComponent, canActivate: [SignGuardService] },
    { path: 'profile', pathMatch: 'full', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'signup', pathMatch: 'full', component: SignupComponent, canActivate: [SignGuardService] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
