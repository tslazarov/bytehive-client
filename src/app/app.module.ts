import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MaterialModule } from './utilities/libraries/material.module';
import { PipesModule } from './utilities/pipes/pipes.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
import { NotifierModule, NotifierOptions } from 'angular-notifier';

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

const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 50
        },
        vertical: {
            position: 'top',
            distance: 80,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

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
        PipesModule,
        NotifierModule.withConfig(customNotifierOptions)
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
