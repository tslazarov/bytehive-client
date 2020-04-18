import { Component, Inject, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../../services/utilities/communication.service';

@Component({
    selector: 'visual-dialog',
    templateUrl: './visual-dialog.html',
    styleUrls: ['./visual.dialog.css']
})
export class VisualDialog {
    // common
    selectedContent: any;

    constructor(public dialogRef: MatDialogRef<VisualDialog>,
        private chgRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    save() {

    }

    close(): void {
        this.dialogRef.close();
    }

    selectionChange(content: any) {
        console.log('aaaa');
        console.log(content);
        this.selectedContent = content;
    }
}

export class VisualData {
    url: string;
    markup: string;
}