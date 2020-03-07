import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { FieldMapping } from '../../models/fieldmapping.model';

@Component({
    selector: 'app-hive',
    templateUrl: './hive.component.html',
    styleUrls: ['./hive.component.css'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
    }]
})
export class HiveComponent implements OnInit, OnDestroy {

    // data
    crawTypeFormGroup: FormGroup;
    dataSourceMappingFormGroup: FormGroup;
    exportTypeFormGroup: FormGroup;
    fieldMappings: FieldMapping[];

    // subscriptions
    languageChangeSubscription: any;

    // labels
    selectPagesTypeLabel: string;
    selectDataSourceMappingLabel: string;
    selectExportTypeLabel: string;
    confirmRequestLabel: string;
    previousLabel: string;
    nextLabel: string;
    confirmLabel: string;

    constructor(private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });

        this.crawTypeFormGroup = this.formBuilder.group({
            crawType: ['', Validators.required]
        });

        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        this.dataSourceMappingFormGroup = this.formBuilder.group({
            detailUrl: ['', [Validators.required, Validators.pattern(reg)]]
        });

        this.exportTypeFormGroup = this.formBuilder.group({
            exportType: ['', Validators.required]
        });

        this.fieldMappings = [];
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.selectPagesTypeLabel = this.translationService.localizeValue('selectPagesTypeLabel', 'hive', 'label');
        this.selectDataSourceMappingLabel = this.translationService.localizeValue('selectDataSourceMappingLabel', 'hive', 'label');
        this.selectExportTypeLabel = this.translationService.localizeValue('selectExportTypeLabel', 'hive', 'label');
        this.confirmRequestLabel = this.translationService.localizeValue('confirmRequestLabel', 'hive', 'label');
        this.previousLabel = this.translationService.localizeValue('previousLabel', 'hive', 'label');
        this.nextLabel = this.translationService.localizeValue('nextLabel', 'hive', 'label');
        this.confirmLabel = this.translationService.localizeValue('confirmLabel', 'hive', 'label');
    }
}
