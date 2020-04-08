import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Constants } from '../../constants';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'bh-fileupload',
    templateUrl: './fileupload.component.html',
    styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit, OnDestroy {
    @Input() parentForm: FormGroup;
    @Input() fieldName: string;
    @Input() regex: string;

    // subscriptions
    languageChangeSubscription: Subscription;

    // common
    files: any[];

    // labels
    dragDropLabel: string;
    orLabel: string;
    browseFileLabel: string;
    fileInstructionsLabel: string;

    constructor(private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.files = [];

        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.dragDropLabel = this.translationService.localizeValue('dragDropLabel', 'fileupload', 'label');
        this.orLabel = this.translationService.localizeValue('orLabel', 'fileupload', 'label');
        this.browseFileLabel = this.translationService.localizeValue('browseFileLabel', 'fileupload', 'label');
        this.fileInstructionsLabel = this.translationService.localizeValue('fileInstructionsLabel', 'fileupload', 'label');
    }

    onFileDropped($event): void {
        this.prepareFilesList($event);
    }

    fileBrowseHandler(files): void {
        if (files.length > 0 && files[0].type == 'text/plain') {
            this.prepareFilesList(files);
        }
    }

    deleteFile(index: number): void {
        this.files.splice(index, 1);
    }

    uploadFilesSimulator(index: number): void {
        const progressInterval = setInterval(() => {
            if (this.files[index].progress === 100) {
                clearInterval(progressInterval);
                this.parseFileContent();
            } else {
                this.files[index].progress += 5;
            }
        }, 1);
    }

    prepareFilesList(files: Array<any>): void {
        this.deleteFile(0);

        for (const item of files) {
            item.progress = 0;
            this.files.push(item);
        }
        this.uploadFilesSimulator(0);
    }

    parseFileContent(): void {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            let lines = fileReader.result.toString().split(/[\r\n]+/);

            if (this.regex == 'URL_REGEX') {
                lines = lines.filter(l => l.match(Constants[this.regex]));
            }

            this.parentForm.controls[this.fieldName].patchValue(lines);
        }
        fileReader.readAsText(this.files[0]);
    }

    formatBytes(bytes, decimals): string {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
