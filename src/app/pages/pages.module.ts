import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../utilities/libraries/material.module';
import { BhFieldsModule } from '../utilities/fields/bhfields.module';
import { PipesModule } from '../utilities/pipes/pipes.module';
import { BhDialogsModule } from '../utilities/dialogs/bhdialogs.module';
import { registerLocaleData } from "@angular/common";
import localeBg from '@angular/common/locales/bg';
import { HomeComponent } from './home/home.component';
import { HiveComponent } from './hive/hive.component';
import { SigninComponent } from './signin/signin.component';
import { FaqComponent } from './faq/faq.component';
import { SignupComponent } from './signup/signup.component';
import { HttpHeaderHelper } from '../utilities/helpers/httpheader-helper';

import { CommunicationService } from '../services/utilities/communication.service';
import { ClientService } from '../services/client.service';
import { DirectivesModule } from '../utilities/directives/directives.module';
import { AccountService } from '../services/account.service';
import { AuthGuardService } from '../services/guards/auth-guard.service';
import { AuthLocalService } from '../services/utilities/auth.service';
import { SignGuardService } from '../services/guards/sign-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ProxyComponent } from './proxy/proxy.component';
import { ScrapeRequestsService } from '../services/scraperequests.service';
import { SecurityComponent } from './profile/security/security.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { InformationComponent } from './profile/information/information.component';
import { PricingComponent } from './pricing/pricing.component';
import { PaymentsService } from '../services/payments.service';
import { OrdersComponent } from './profile/orders/orders.component';

registerLocaleData(localeBg, 'bg');

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
        DirectivesModule,
        NgxPayPalModule
    ],
    declarations: [
        HomeComponent,
        HiveComponent,
        SigninComponent,
        FaqComponent,
        SignupComponent,
        ProfileComponent,
        ProxyComponent,
        SecurityComponent,
        SettingsComponent,
        InformationComponent,
        PricingComponent,
        OrdersComponent
    ],
    entryComponents: [],
    providers: [
        CommunicationService,
        ClientService,
        AccountService,
        ScrapeRequestsService,
        PaymentsService,
        AuthLocalService,
        AuthGuardService,
        SignGuardService,
        HttpHeaderHelper
    ]
})
export class PagesModule { }
