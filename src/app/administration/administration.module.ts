import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministrationRoutingModule } from './administration-routing.module';
import { MaterialModule } from '../utilities/libraries/material.module';
import { PipesModule } from '../utilities/pipes/pipes.module';

import { CommunicationService } from '../services/utilities/communication.service';
import { ClientService } from '../services/client.service';
import { DirectivesModule } from '../utilities/directives/directives.module';
import { AccountService } from '../services/account.service';
import { AuthLocalService } from '../services/utilities/auth.service';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ScrapeRequestsComponent } from './scraperequests/scraperequests.component';
import { AuthAdminGuardService } from '../services/guards/authadmin-guard.service';

@NgModule({
    imports: [
        CommonModule,
        AdministrationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        PipesModule,
        DirectivesModule
    ],
    declarations: [
        DashboardComponent,
        UsersComponent,
        ScrapeRequestsComponent],
    entryComponents: [],
    providers: [
        CommunicationService,
        ClientService,
        AccountService,
        AuthLocalService,
        AuthAdminGuardService,
        HttpHeaderHelper
    ]
})
export class AdministrationModule { }
