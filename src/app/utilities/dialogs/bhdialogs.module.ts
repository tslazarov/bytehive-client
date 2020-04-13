import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/utilities/libraries/material.module';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';
import { TranslationService } from '../../services/utilities/translation.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CodeViewDialog } from './codeview/codeview.dialog';
import { CodeDialog } from './code/code.dialog';
import { VisualDialog } from './visual/visual.dialog';
import { ManualDialog } from './manual/manual.dialog';
import { AutomaticDialog } from './automatic/automatic.dialog';
import { PagingInformationDialog } from './paginginformation/paginginformation.dialog';
import { ConfirmationDialog } from './confirmation/confirmation.dialog';
import { ResetPasswordDialog } from './resetpassword/resetpassword.dialog';
import { ScraperService } from '../../services/scraper.service';

@NgModule({
    declarations: [
        CodeViewDialog,
        CodeDialog,
        VisualDialog,
        ManualDialog,
        AutomaticDialog,
        PagingInformationDialog,
        ConfirmationDialog,
        ResetPasswordDialog
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
    ],
    entryComponents: [
        CodeViewDialog,
        CodeDialog,
        VisualDialog,
        ManualDialog,
        AutomaticDialog,
        PagingInformationDialog,
        ConfirmationDialog,
        ResetPasswordDialog
    ],
    providers: [
        TranslationService,
        ScraperService
    ]
})
export class BhDialogsModule { }
