import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../utilities/libraries/material.module';
import { BhFieldsModule } from '../utilities/fields/bhfields.module';
import { PipesModule } from '../utilities/pipes/pipes.module';

import { HomeComponent } from './home/home.component';
import { HiveComponent } from './hive/hive.component';
import { SigninComponent } from './signin/signin.component';
import { FaqComponent } from './faq/faq.component';
import { SignupComponent } from './signup/signup.component';
import { CommunicationService } from '../services/communication.service';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BhFieldsModule,
        PipesModule
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
        CommunicationService
    ]
})
export class PagesModule { }
