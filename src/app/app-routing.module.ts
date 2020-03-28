import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './common-pages/forbidden/forbidden.component';
import { NotfoundComponent } from './common-pages/notfound/notfound.component';

const routes: Routes = [
    { path: '', loadChildren: './pages/pages.module#PagesModule' },
    { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule' },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: '**', component: NotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
