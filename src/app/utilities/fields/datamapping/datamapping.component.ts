import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { first } from 'rxjs/operators';
import { FieldMappingGroup } from '../../../models/fieldmapping-group.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { CodeViewDialog, CodeViewData } from '../../dialogs/codeview/codeview.dialog';
import { CodeData, CodeDialog } from '../../dialogs/code/code.dialog';
import { ManualData, ManualDialog } from '../../dialogs/manual/manual.dialog';
import { AutomaticData, AutomaticDialog } from '../../dialogs/automatic/automatic.dialog';
import { Subscription } from 'rxjs';
import { VisualDialog, VisualData } from '../../dialogs/visual/visual.dialog';
import { FieldMapping } from '../../../models/fieldmapping.model';
import { ValidateDetail } from '../../../models/validatedetail.model';
import { ScraperService } from '../../../services/scraper.service';
import { DetailValidationDialog, DetailValidationData } from '../../dialogs/detailvalidation/detailvalidation.dialog';

@Component({
    selector: 'bh-datamapping',
    templateUrl: './datamapping.component.html',
    styleUrls: ['./datamapping.component.css']
})
export class DatamappingComponent implements OnInit, OnDestroy {
    @Input() parentForm: FormGroup;
    @Input() fieldMappings: FieldMappingGroup[];

    // subscriptions
    languageChangeSubscription: Subscription;

    // common
    showErrorMessage: boolean;

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
    errorMessageLabel: string;

    constructor(private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private clientService: ClientService,
        private scraperService: ScraperService,
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
        let fieldMapping = new FieldMappingGroup(this.formBuilder);
        this.fieldMappings.push(fieldMapping);
    }

    removeMapping(id: string): void {
        let index = this.fieldMappings.map(fm => fm.id).indexOf(id);

        if (index > -1) {
            this.fieldMappings.splice(index, 1);
        }
    }

    automaticMapping(fieldMapping: FieldMappingGroup): void {
        if (!this.parentForm.value.detailUrl || this.parentForm.controls['detailUrl'].invalid) {
            this.parentForm.controls['detailUrl'].markAsTouched();
            return;
        }

        let url = this.parentForm.value.detailUrl;

        let automaticData = new AutomaticData();
        automaticData.markup = fieldMapping.formGroup.value.fieldMarkup;
        automaticData.url = url;
        automaticData.scrapeLink = false;

        let dialogRef = this.dialog.open(AutomaticDialog, { width: '60vw', minHeight: '380px', autoFocus: false, data: automaticData });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.markup) {
                fieldMapping.formGroup.patchValue({ fieldMarkup: result.markup });
            }
        });
    }

    visualMapping(fieldMapping: FieldMappingGroup): void {
        if (!this.parentForm.value.detailUrl || this.parentForm.controls['detailUrl'].invalid) {
            this.parentForm.controls['detailUrl'].markAsTouched();
            return;
        }

        let url = this.parentForm.value.detailUrl;

        let visualData = new VisualData();
        visualData.markup = fieldMapping.formGroup.value.fieldMarkup;
        visualData.proxyUrl = '/proxy?url=' + url;
        visualData.url = url;
        visualData.scrapeLink = false;

        let dialogRef = this.dialog.open(VisualDialog, { width: '90vw', minHeight: '380px', autoFocus: false, data: visualData });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.markup) {
                fieldMapping.formGroup.patchValue({ fieldMarkup: result.markup });
            }
        });
    }

    codeMapping(fieldMapping: FieldMappingGroup): void {
        if (!this.parentForm.value.detailUrl || this.parentForm.controls['detailUrl'].invalid) {
            this.parentForm.controls['detailUrl'].markAsTouched();
            return;
        }

        let url = this.parentForm.value.detailUrl;

        this.clientService.getPageMarkup(url, false)
            .pipe(first())
            .subscribe((markup) => {
                let codeData = new CodeData();
                codeData.url = url;
                codeData.code = markup;
                codeData.markup = fieldMapping.formGroup.value.fieldMarkup;
                codeData.scrapeLink = false;

                let dialogRef = this.dialog.open(CodeDialog, { width: '90vw', height: '90vh', autoFocus: false, data: codeData });

                dialogRef.afterClosed().subscribe(result => {
                    if (result && result.markup) {
                        fieldMapping.formGroup.patchValue({ fieldMarkup: result.markup });
                    }
                });
            });
    }

    manualMapping(fieldMapping: FieldMappingGroup): void {
        let manualData = new ManualData();
        manualData.markup = fieldMapping.formGroup.value.fieldMarkup;

        let dialogRef = this.dialog.open(ManualDialog, { width: '60vw', minHeight: '380px', autoFocus: false, data: manualData });

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

        this.clientService.getPageMarkup(this.parentForm.value.detailUrl, false)
            .pipe(first())
            .subscribe((markup) => {
                let codeViewData = new CodeViewData();
                codeViewData.markup = markup;

                let dialogRef = this.dialog.open(CodeViewDialog, { width: '90vw', height: '90vh', autoFocus: false, data: codeViewData });

                dialogRef.afterClosed().subscribe(result => { });
            });
    }

    toggleEditMode(fieldMapping: FieldMappingGroup, editable: boolean): void {
        fieldMapping.editMode = editable;
    }

    validate() {
        if (!this.parentForm.value.detailUrl || this.parentForm.controls['detailUrl'].invalid) {
            this.parentForm.controls['detailUrl'].markAsTouched();
            return;
        }

        let url = this.parentForm.value.detailUrl;

        let validateDetail = new ValidateDetail();
        validateDetail.url = url;
        validateDetail.fieldMappings = this.fieldMappings.map(fm => { return new FieldMapping(fm.formGroup.controls['fieldName'].value, fm.formGroup.controls['fieldMarkup'].value) });

        this.scraperService.validateDetail(validateDetail).subscribe((result) => {
            if (result) {
                let detailValidationData = new DetailValidationData();
                detailValidationData.valid = result.valid;
                detailValidationData.fieldMappings = result.fieldMappings;

                let dialogRef = this.dialog.open(DetailValidationDialog, { width: '700px', minHeight: '450px', autoFocus: false, data: detailValidationData });

                dialogRef.afterClosed().subscribe(result => { });
            }
        }, (error) => {
            this.showErrorMessage = true;
            this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'datamapping', 'label');
            setTimeout(() => { this.showErrorMessage = false }, 4000);
        })
    }
}
