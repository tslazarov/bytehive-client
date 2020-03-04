import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/utilities/libraries/material.module';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';
import { TranslationService } from '../../services/translation.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CrawpickerComponent } from './crawpicker/crawpicker.component';
import { ExportpickerComponent } from './exportpicker/exportpicker.component';
import { CommunicationService } from '../../services/communication.service';


@NgModule({
    declarations: [
        CrawpickerComponent,
        ExportpickerComponent
    ],
    imports: [
        MaterialModule,
        PipesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CrawpickerComponent,
        ExportpickerComponent
    ],
    providers: [
        TranslationService,
        CommunicationService
    ]
})
export class BhFieldsModule { }
