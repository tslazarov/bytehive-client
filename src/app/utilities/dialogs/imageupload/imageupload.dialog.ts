import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BhValidators } from '../../validators/bhvalidators';
import { AccountService } from '../../../services/account.service';
import { ResetCodeVerification } from '../../../models/resetcodeverification.model';
import { ResetPasswordVerification } from '../../../models/resetpasswordverification.model';
import { Constants } from '../../constants';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'imageupload-dialog',
    templateUrl: './imageupload-dialog.html',
    styleUrls: ['./imageupload.dialog.css']
})
export class ImageUploadDialog {
    fileForm: FormGroup;
    fieldName: string;
    regex: string;

    // common
    files: any[];
    imageChangedEvent: any;
    croppedImage: any;
    shouldCropImage: boolean;

    // labels
    dragDropLabel: string;
    orLabel: string;
    browseFileLabel: string;
    fileInstructionsLabel: string;
    confirmLabel: string;
    cancelLabel: string;

    constructor(public dialogRef: MatDialogRef<ImageUploadDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
    }

    setLabelsMessages(): void {
        this.confirmLabel = this.translationService.localizeValue('confirmLabel', 'confirmation-dialog', 'label');
        this.cancelLabel = this.translationService.localizeValue('cancelLabel', 'confirmation-dialog', 'label');
        this.dragDropLabel = this.translationService.localizeValue('dragDropLabel', 'fileupload', 'label');
        this.orLabel = this.translationService.localizeValue('orLabel', 'fileupload', 'label');
        this.browseFileLabel = this.translationService.localizeValue('browseFileLabel', 'fileupload', 'label');
        this.fileInstructionsLabel = this.translationService.localizeValue('fileInstructionsLabel', 'fileupload', 'label');
    }

    close(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        this.dialogRef.close(this.croppedImage);
    }

    onFileDropped($event): void {
        this.imageChangedEvent = event;
        this.shouldCropImage = true;
    }

    fileBrowseHandler(event): void {
        this.imageChangedEvent = event;
        this.shouldCropImage = true;
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
}