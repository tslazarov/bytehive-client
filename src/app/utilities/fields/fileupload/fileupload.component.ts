import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Constants } from '../../constants';

@Component({
    selector: 'bh-fileupload',
    templateUrl: './fileupload.component.html',
    styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
    @Input() parentForm: FormGroup;
    @Input() fieldName: string;
    @Input() regex: string;

    files: any[];

    constructor() { }

    ngOnInit() {
        this.files = [];
    }

    onFileDropped($event) {
        console.log('test');
        this.prepareFilesList($event);
    }

    fileBrowseHandler(files) {
        if (files.length > 0 && files[0].type == 'text/plain') {
            this.prepareFilesList(files);
        }
    }

    deleteFile(index: number) {
        this.files.splice(index, 1);
    }

    uploadFilesSimulator(index: number) {
        const progressInterval = setInterval(() => {
            if (this.files[index].progress === 100) {
                clearInterval(progressInterval);
                this.parseFileContent();
            } else {
                this.files[index].progress += 5;
            }
        }, 1);
    }

    prepareFilesList(files: Array<any>) {
        this.deleteFile(0);

        for (const item of files) {
            item.progress = 0;
            this.files.push(item);
        }
        this.uploadFilesSimulator(0);
    }

    parseFileContent() {
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

    formatBytes(bytes, decimals) {
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
