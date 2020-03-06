import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
    selector: 'app-hive',
    templateUrl: './hive.component.html',
    styleUrls: ['./hive.component.css'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
    }]
})
export class HiveComponent implements OnInit, OnDestroy {
    crawTypeFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    exportTypeFormGroup: FormGroup;

    // subscriptions
    languageChangeSubscription: any;

    // labels
    selectPagesTypeLabel: string;
    selectDataSourceLabel: string;
    setDataMappingsLabel: string;
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

        this.secondFormGroup = this.formBuilder.group({
            secondCtrl: ['', Validators.required]
        });

        this.thirdFormGroup = this.formBuilder.group({
            secondCtrl: ['', Validators.required]
        });

        this.exportTypeFormGroup = this.formBuilder.group({
            exportType: ['', Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.selectPagesTypeLabel = this.translationService.localizeValue('selectPagesTypeLabel', 'hive', 'label');
        this.selectDataSourceLabel = this.translationService.localizeValue('selectDataSourceLabel', 'hive', 'label');
        this.setDataMappingsLabel = this.translationService.localizeValue('setDataMappingsLabel', 'hive', 'label');
        this.selectExportTypeLabel = this.translationService.localizeValue('selectExportTypeLabel', 'hive', 'label');
        this.confirmRequestLabel = this.translationService.localizeValue('confirmRequestLabel', 'hive', 'label');
        this.previousLabel = this.translationService.localizeValue('previousLabel', 'hive', 'label');
        this.nextLabel = this.translationService.localizeValue('nextLabel', 'hive', 'label');
        this.confirmLabel = this.translationService.localizeValue('confirmLabel', 'hive', 'label');
    }
}
