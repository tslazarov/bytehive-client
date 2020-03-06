import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/utilities/libraries/material.module';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';
import { TranslationService } from '../../services/translation.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { CrawpickerComponent } from './crawpicker/crawpicker.component';
import { ExportpickerComponent } from './exportpicker/exportpicker.component';
import { CommunicationService } from '../../services/communication.service';
import { DatamappingComponent } from './datamapping/datamapping.component';


@NgModule({
    declarations: [
        CrawpickerComponent,
        ExportpickerComponent,
        DatamappingComponent
    ],
    imports: [
        MaterialModule,
        PipesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MonacoEditorModule
    ],
    exports: [
        CrawpickerComponent,
        ExportpickerComponent,
        DatamappingComponent
    ],
    providers: [
        TranslationService,
        CommunicationService
    ]
})
export class BhFieldsModule { }
