import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../utilities/libraries/material.module';
import { BhFieldsModule } from '../utilities/fields/bhfields.module';
import { PipesModule } from '../utilities/pipes/pipes.module';
import { BhDialogsModule } from '../utilities/dialogs/bhdialogs.module';

import { HomeComponent } from './home/home.component';
import { HiveComponent } from './hive/hive.component';
import { SigninComponent } from './signin/signin.component';
import { FaqComponent } from './faq/faq.component';
import { SignupComponent } from './signup/signup.component';
import { CommunicationService } from '../services/communication.service';

import { ClientService } from '../services/client.service';
import { DirectivesModule } from '../utilities/directives/directives.module';
import { AccountService } from '../services/account.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BhFieldsModule,
        BhDialogsModule,
        PipesModule,
        DirectivesModule
    ],
    declarations: [
        HomeComponent,
        HiveComponent,
        SigninComponent,
        FaqComponent,
        SignupComponent
    ],
    entryComponents: [],
    providers: [
        CommunicationService,
        ClientService,
        AccountService,
        AuthService,
        AuthGuardService,
        HttpHeaderHelper
    ]
})
export class PagesModule { }
