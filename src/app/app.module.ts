import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utilities/libraries/material.module';
import { TranslationService } from './services/translation.service';
import { PipesModule } from './utilities/pipes/pipes.module';

import { CommunicationService } from './services/communication.service';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        PipesModule
    ],
    providers: [
        TranslationService,
        CommunicationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }