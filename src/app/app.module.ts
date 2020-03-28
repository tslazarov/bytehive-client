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

import { CommunicationService } from './services/communication.service';
import { TranslationService } from './services/translation.service';
import { AuthLocalService } from './services/auth.service';
import { AccountService } from './services/account.service';

import { HttpHeaderHelper } from './utilities/helpers/httpheader-helper';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './common-pages/notfound/notfound.component';
import { ForbiddenComponent } from './common-pages/forbidden/forbidden.component';

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("225852297743-0m0vn0eojlu1jg6pqj0s0itmqocalf45.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Facebook-App-Id")
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
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
