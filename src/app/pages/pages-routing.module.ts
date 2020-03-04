import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HiveComponent } from './hive/hive.component';
import { FaqComponent } from './faq/faq.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'hive', pathMatch: 'full', component: HiveComponent },
    { path: 'faq', pathMatch: 'full', component: FaqComponent },
    { path: 'signin', pathMatch: 'full', component: SigninComponent },
    { path: 'signup', pathMatch: 'full', component: SignupComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
