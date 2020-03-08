import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { FieldMapping } from '../../models/fieldmapping.model';
import { Constants } from '../../utilities/constants';
import { CrawType } from '../../models/enums/crawtype.enum';
import { BhValidators } from '../../utilities/validators/bhvalidators';

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

    // enums
    crawTypes = CrawType;

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


        this.dataSourceMappingFormGroup = this.formBuilder.group({
            listUrl: [''],
            hasPaging: [false],
            startPage: [1],
            endPage: [100],
            detailLink: [''],
            detailUrls: [[]],
            detailUrl: ['', [Validators.required, Validators.pattern(Constants.URL_REGEX)]]
        });

        this.exportTypeFormGroup = this.formBuilder.group({
            exportType: ['', Validators.required]
        });

        this.fieldMappings = [];

        this.subscribeCrawTypeFormDependency();
        this.subscribeDataSourceMappingFormDependency();
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

    subscribeCrawTypeFormDependency() {
        this.crawTypeFormGroup.get('crawType').valueChanges.subscribe(crawType => {
            let listUrlControl = this.dataSourceMappingFormGroup.controls['listUrl'];
            let hasPagingControl = this.dataSourceMappingFormGroup.controls['hasPaging'];
            let startPageControl = this.dataSourceMappingFormGroup.controls['startPage'];
            let endPageControl = this.dataSourceMappingFormGroup.controls['endPage'];
            let detailLinkControl = this.dataSourceMappingFormGroup.controls['detailLink'];
            let detailUrlsControl = this.dataSourceMappingFormGroup.controls['detailUrls'];

            listUrlControl.reset;
            hasPagingControl.reset;
            startPageControl.reset;
            endPageControl.reset;
            detailLinkControl.reset;
            detailUrlsControl.reset;

            switch (crawType) {
                case this.crawTypes.ListDetail: {
                    listUrlControl.setValidators([Validators.required, Validators.pattern(Constants.URL_REGEX)]);
                    detailLinkControl.setValidators([Validators.required]);
                    detailUrlsControl.setValidators(null);
                    break;
                }
                case this.crawTypes.List: {
                    listUrlControl.setValidators([Validators.required, Validators.pattern(Constants.URL_REGEX)]);
                    detailLinkControl.setValidators(null);
                    detailUrlsControl.setValidators(null);
                    break;
                }
                case this.crawTypes.Detail: {
                    listUrlControl.setValidators(null);
                    detailLinkControl.setValidators(null);
                    detailUrlsControl.setValidators([BhValidators.arrayLengthRequired]);
                    break;
                }
            }

            listUrlControl.updateValueAndValidity();
            detailLinkControl.updateValueAndValidity();
            detailUrlsControl.updateValueAndValidity();
        });
    }

    subscribeDataSourceMappingFormDependency() {
        this.dataSourceMappingFormGroup.get('detailUrls').valueChanges.subscribe(detailUrls => {

        });
    }

    stepChanged(event, stepper) {
        if (event.previouslySelectedIndex > event.selectedIndex) {
            stepper.selected.interacted = false;
        }
        else {
            stepper.selected.interacted = true;
        }
    }
}
