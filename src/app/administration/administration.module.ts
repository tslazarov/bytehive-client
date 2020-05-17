import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministrationRoutingModule } from './administration-routing.module';
import { MaterialModule } from '../utilities/libraries/material.module';
import { PipesModule } from '../utilities/pipes/pipes.module';
import { registerLocaleData } from "@angular/common";
import localeBg from '@angular/common/locales/bg';
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
import { UsersService } from '../services/users.service';
import { UsersDetailComponent } from './usersdetail/usersdetail.component';
import { BhDialogsModule } from '../utilities/dialogs/bhdialogs.module';
import { ScrapeRequestsService } from '../services/scraperequests.service';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentsService } from '../services/payments.service';
import { FileManagerHelper } from '../utilities/helpers/filemanager-helper';

registerLocaleData(localeBg, 'bg');

@NgModule({
    imports: [
        CommonModule,
        AdministrationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        PipesModule,
        DirectivesModule,
        BhDialogsModule
    ],
    declarations: [
        DashboardComponent,
        UsersComponent,
        ScrapeRequestsComponent,
        UsersDetailComponent,
        PaymentsComponent],
    entryComponents: [],
    providers: [
        CommunicationService,
        ClientService,
        AccountService,
        UsersService,
        ScrapeRequestsService,
        PaymentsService,
        AuthLocalService,
        AuthAdminGuardService,
        HttpHeaderHelper,
        FileManagerHelper
    ]
})
export class AdministrationModule { }
