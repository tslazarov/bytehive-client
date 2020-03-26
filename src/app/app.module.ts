import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MaterialModule } from './utilities/libraries/material.module';
import { TranslationService } from './services/translation.service';
import { PipesModule } from './utilities/pipes/pipes.module';

import { CommunicationService } from './services/communication.service';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';
import { HttpHeaderHelper } from './utilities/helpers/httpheader-helper';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MonacoEditorModule.forRoot(),
        MaterialModule,
        PipesModule
    ],
    providers: [
        TranslationService,
        CommunicationService,
        AuthService,
        AccountService,
        HttpHeaderHelper
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
