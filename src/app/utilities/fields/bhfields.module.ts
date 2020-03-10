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
import { SummaryComponent } from './summary/summary.component';
import { DatasourceComponent } from './datasource/datasource.component';
import { FileuploadComponent } from './fileupload/fileupload.component';


@NgModule({
    declarations: [
        CrawpickerComponent,
        ExportpickerComponent,
        DatamappingComponent,
        DatasourceComponent,
        SummaryComponent,
        FileuploadComponent
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
        DatamappingComponent,
        DatasourceComponent,
        SummaryComponent
    ],
    providers: [
        TranslationService,
        CommunicationService
    ]
})
export class BhFieldsModule { }
