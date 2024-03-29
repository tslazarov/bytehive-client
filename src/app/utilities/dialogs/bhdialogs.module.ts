import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/utilities/libraries/material.module';
import { PipesModule } from 'src/app/utilities/pipes/pipes.module';
import { TranslationService } from '../../services/utilities/translation.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CodeViewDialog } from './codeview/codeview.dialog';
import { CodeDialog } from './code/code.dialog';
import { VisualDialog } from './visual/visual.dialog';
import { ManualDialog } from './manual/manual.dialog';
import { AutomaticDialog } from './automatic/automatic.dialog';
import { PagingInformationDialog } from './paginginformation/paginginformation.dialog';
import { ConfirmationDialog } from './confirmation/confirmation.dialog';
import { ResetPasswordDialog } from './resetpassword/resetpassword.dialog';
import { ScraperService } from '../../services/scraper.service';
import { ProxyWrapperComponent } from '../../pages/proxywrapper/proxywrapper.component';
import { BhFieldsModule } from '../fields/bhfields.module';
import { LinksViewDialog } from './linksview/linksview.dialog';
import { DetailValidationDialog } from './detailvalidation/detailvalidation.dialog';
import { EmailChangeDialog } from './emailchange/emailchange.dialog';
import { RequestDetailDialog } from './requestdetail/requestdetail.dialog';
import { PayPalPaymentDialog } from './paypalpayment/paypalpayment.dialog';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentDetailDialog } from './paymentdetail/paymentdetail.dialog';
import { ShareLinkDialog } from './sharelink/sharelink.dialog';
import { ImageUploadDialog } from './imageupload/imageupload.dialog';
import { FaqCreateDialog } from './faqcreate/faqcreate.dialog';
import { FaqEditDialog } from './faqedit/faqedit.dialog';

@NgModule({
    declarations: [
        CodeViewDialog,
        CodeDialog,
        VisualDialog,
        ManualDialog,
        AutomaticDialog,
        PagingInformationDialog,
        ConfirmationDialog,
        ResetPasswordDialog,
        LinksViewDialog,
        DetailValidationDialog,
        EmailChangeDialog,
        RequestDetailDialog,
        PaymentDetailDialog,
        PayPalPaymentDialog,
        ShareLinkDialog,
        ImageUploadDialog,
        FaqCreateDialog,
        FaqEditDialog,
        ProxyWrapperComponent
    ],
    imports: [
        MaterialModule,
        PipesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MonacoEditorModule,
        BhFieldsModule,
        ImageCropperModule,
        NgxPayPalModule
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
        ResetPasswordDialog,
        LinksViewDialog,
        DetailValidationDialog,
        EmailChangeDialog,
        RequestDetailDialog,
        PaymentDetailDialog,
        PayPalPaymentDialog,
        ShareLinkDialog,
        ImageUploadDialog,
        FaqCreateDialog,
        FaqEditDialog
    ],
    providers: [
        TranslationService,
        ScraperService
    ]
})
export class BhDialogsModule { }
