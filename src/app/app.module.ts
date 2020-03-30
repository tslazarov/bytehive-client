import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MaterialModule } from './utilities/libraries/material.module';
import { PipesModule } from './utilities/pipes/pipes.module';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { CommunicationService } from './services/utilities/communication.service';
import { TranslationService } from './services/utilities/translation.service';
import { AuthLocalService } from './services/utilities/auth.service';
import { AccountService } from './services/account.service';

import { HttpHeaderHelper } from './utilities/helpers/httpheader-helper';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './common-pages/notfound/notfound.component';
import { ForbiddenComponent } from './common-pages/forbidden/forbidden.component';
import { environment } from '../environments/environment';
import { MatPaginatorIntl } from '@angular/material';
import { getLocalizablePaginatorIntl } from './utilities/extensions/localizable-paginator';

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.googleClietId)
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.facebookAppId)
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        ForbiddenComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MonacoEditorModule.forRoot(),
        SocialLoginModule,
        MaterialModule,
        PipesModule
    ],
    providers: [
        TranslationService,
        CommunicationService,
        AuthLocalService,
        AccountService,
        HttpHeaderHelper,
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        {
            provide: MatPaginatorIntl,
            useValue: getLocalizablePaginatorIntl()
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
