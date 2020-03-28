import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { first } from 'rxjs/operators';
import { FieldMapping } from '../../../models/fieldmapping.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CommunicationService } from '../../../services/communication.service';
import { TranslationService } from '../../../services/translation.service';
import { CodeViewDialog, CodeViewData } from '../../dialogs/codeview/codeview.dialog';
import { CodeData, CodeDialog } from '../../dialogs/code/code.dialog';
import { ManualData, ManualDialog } from '../../dialogs/manual/manual.dialog';
import { AutomaticData, AutomaticDialog } from '../../dialogs/automatic/automatic.dialog';
import { Subscription } from 'rxjs';

@Component({
    selector: 'bh-datamapping',
    templateUrl: './datamapping.component.html',
    styleUrls: ['./datamapping.component.css']
})
export class DatamappingComponent implements OnInit, OnDestroy {
    @Input() parentForm: FormGroup;
    @Input() fieldMappings: FieldMapping[];

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    dataMappingLabel: string;
    detailUrlLabel: string;
    nameLabel: string;
    markupLabel: string;
    insertFieldNameLabel: string;
    insertFieldMarkupLabel: string;
    automaticLabel: string;
    visualLabel: string;
    codeLabel: string;
    manualLabel: string;
    validateLabel: string;


    constructor(private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private clientService: ClientService,
        private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.detailUrlLabel = this.translationService.localizeValue('detailUrlLabel', 'datamapping', 'label');
        this.dataMappingLabel = this.translationService.localizeValue('dataMappingLabel', 'datamapping', 'label');
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'datamapping', 'label');
        this.markupLabel = this.translationService.localizeValue('markupLabel', 'datamapping', 'label');
        this.insertFieldNameLabel = this.translationService.localizeValue('insertFieldNameLabel', 'datamapping', 'label');
        this.insertFieldMarkupLabel = this.translationService.localizeValue('insertFieldMarkupLabel', 'datamapping', 'label');
        this.automaticLabel = this.translationService.localizeValue('automaticLabel', 'datamapping', 'label');
        this.visualLabel = this.translationService.localizeValue('visualLabel', 'datamapping', 'label');
        this.codeLabel = this.translationService.localizeValue('codeLabel', 'datamapping', 'label');
        this.manualLabel = this.translationService.localizeValue('manualLabel', 'datamapping', 'label');
        this.validateLabel = this.translationService.localizeValue('validateLabel', 'datamapping', 'label');
    }

    addMapping(): void {
        let fieldMapping = new FieldMapping(this.formBuilder);
        this.fieldMappings.push(fieldMapping);
    }

    removeMapping(id: string): void {
        let index = this.fieldMappings.map(fm => fm.id).indexOf(id);

        if (index > -1) {
            this.fieldMappings.splice(index, 1);
        }
    }

    automaticMapping(fieldMapping: FieldMapping): void {
        let automaticData = new AutomaticData();
        automaticData.markup = fieldMapping.formGroup.value.fieldMarkup;

        let dialogRef = this.dialog.open(AutomaticDialog, { width: '60vw', height: '380px', autoFocus: false, data: automaticData });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    visualMapping(fieldMapping: FieldMapping): void {

    }

    codeMapping(fieldMapping: FieldMapping): void {
        if (!this.parentForm.value.detailUrl || this.parentForm.controls['detailUrl'].invalid) {
            this.parentForm.controls['detailUrl'].markAsTouched();
            return;
        }

        // TODO: send request to proxy

        this.clientService.getPageMarkup(this.parentForm.value.detailUrl)
            .pipe(first())
            .subscribe((markup) => {
                let codeData = new CodeData();
                codeData.code = markup;
                codeData.markup = fieldMapping.formGroup.value.fieldMarkup;

                let dialogRef = this.dialog.open(CodeDialog, { width: '90vw', height: '90vh', autoFocus: false, data: codeData });

                dialogRef.afterClosed().subscribe(result => {
                    if (result && result.markup) {
                        fieldMapping.formGroup.patchValue({ fieldMarkup: result.markup });
                    }
                });
            });
    }

    manualMapping(fieldMapping: FieldMapping): void {
        let manualData = new ManualData();
        manualData.markup = fieldMapping.formGroup.value.fieldMarkup;

        let dialogRef = this.dialog.open(ManualDialog, { width: '60vw', height: '380px', autoFocus: false, data: manualData });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.markup) {
                fieldMapping.formGroup.patchValue({ fieldMarkup: result.markup });
            }
        });
    }

    codeView(): void {
        if (!this.parentForm.value.detailUrl || this.parentForm.controls['detailUrl'].invalid) {
            this.parentForm.controls['detailUrl'].markAsTouched();
            return;
        }
        // TODO: send request to proxy

        this.clientService.getPageMarkup(this.parentForm.value.detailUrl)
            .pipe(first())
            .subscribe((markup) => {
                let codeViewData = new CodeViewData();
                codeViewData.markup = markup;

                let dialogRef = this.dialog.open(CodeViewDialog, { width: '90vw', height: '90vh', autoFocus: false, data: codeViewData });

                dialogRef.afterClosed().subscribe(result => { });
            });
    }

    toggleEditMode(fieldMapping: FieldMapping, editable: boolean): void {
        fieldMapping.editMode = editable;
    }

    validate() {

    }
}
