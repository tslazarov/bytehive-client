import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { FieldMapping } from '../../models/fieldmapping.model';
import { Constants } from '../../utilities/constants';
import { ScrapeType } from '../../models/enums/scrapetype.enum';
import { BhValidators } from '../../utilities/validators/bhvalidators';
import { Subscription } from 'rxjs';

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
    scrapeTypeFormGroup: FormGroup;
    dataSourceMappingFormGroup: FormGroup;
    exportTypeFormGroup: FormGroup;
    fieldMappings: FieldMapping[];

    // enums
    scrapeTypes = ScrapeType;

    // subscriptions
    languageChangeSubscription: Subscription;

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

    ngOnInit(): void {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });

        this.scrapeTypeFormGroup = this.formBuilder.group({
            scrapeType: ['', Validators.required]
        });


        this.dataSourceMappingFormGroup = this.formBuilder.group({
            listUrl: [''],
            hasPaging: [false],
            startPage: [],
            endPage: [],
            detailMarkup: [''],
            detailUrls: [[]],
            detailUrl: ['', [Validators.required, Validators.pattern(Constants.URL_REGEX)]]
        });

        this.exportTypeFormGroup = this.formBuilder.group({
            exportType: ['', Validators.required]
        });

        this.fieldMappings = [];

        this.subscribeScrapeTypeFormDependency();
        this.subscribeDataSourceMappingFormDependency();
        this.subscribeExportTypeFormDependency();
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

    subscribeScrapeTypeFormDependency(): void {
        this.scrapeTypeFormGroup.get('scrapeType').valueChanges.subscribe(scrapeType => {
            let listUrlControl = this.dataSourceMappingFormGroup.controls['listUrl'];
            let hasPagingControl = this.dataSourceMappingFormGroup.controls['hasPaging'];
            let startPageControl = this.dataSourceMappingFormGroup.controls['startPage'];
            let endPageControl = this.dataSourceMappingFormGroup.controls['endPage'];
            let detailMarkupControl = this.dataSourceMappingFormGroup.controls['detailMarkup'];
            let detailUrlsControl = this.dataSourceMappingFormGroup.controls['detailUrls'];

            listUrlControl.reset;
            hasPagingControl.reset;
            startPageControl.reset;
            endPageControl.reset;
            detailMarkupControl.reset;
            detailUrlsControl.reset;

            switch (scrapeType) {
                case this.scrapeTypes.ListDetail: {
                    listUrlControl.setValidators([Validators.required, Validators.pattern(Constants.URL_REGEX)]);
                    detailMarkupControl.setValidators([Validators.required]);
                    detailUrlsControl.setValidators(null);

                    listUrlControl.reset();
                    detailMarkupControl.reset();
                    detailUrlsControl.reset([]);
                    break;
                }
                case this.scrapeTypes.List: {
                    listUrlControl.setValidators([Validators.required, Validators.pattern(Constants.URL_REGEX)]);
                    detailMarkupControl.setValidators(null);
                    detailUrlsControl.setValidators(null);

                    listUrlControl.reset();
                    detailMarkupControl.reset();
                    detailUrlsControl.reset([]);
                    break;
                }
                case this.scrapeTypes.Detail: {
                    listUrlControl.setValidators(null);
                    detailMarkupControl.setValidators(null);
                    detailUrlsControl.setValidators([BhValidators.arrayLengthRequired]);

                    listUrlControl.reset();
                    detailMarkupControl.reset();
                    detailUrlsControl.reset([]);
                    break;
                }
            }

            listUrlControl.updateValueAndValidity();
            detailMarkupControl.updateValueAndValidity();
            detailUrlsControl.updateValueAndValidity();

            this.communicationService.emitScrapeTypeChange(scrapeType);
        });
    }

    subscribeDataSourceMappingFormDependency(): void {
        this.dataSourceMappingFormGroup.get('hasPaging').valueChanges.subscribe(hasPaging => {
            let listUrlControl = this.dataSourceMappingFormGroup.controls['listUrl'];
            let startPageControl = this.dataSourceMappingFormGroup.controls['startPage'];
            let endPageControl = this.dataSourceMappingFormGroup.controls['endPage'];

            if (hasPaging) {
                listUrlControl.setValidators([Validators.required, Validators.pattern(Constants.URL_REGEX_PAGING)]);
                startPageControl.setValidators([Validators.required]);
                endPageControl.setValidators([Validators.required]);

                listUrlControl.updateValueAndValidity();
                startPageControl.updateValueAndValidity();
                endPageControl.updateValueAndValidity();
            }
            else {
                listUrlControl.setValidators([Validators.required, Validators.pattern(Constants.URL_REGEX)]);
                startPageControl.setValidators(null);
                endPageControl.setValidators(null);

                listUrlControl.updateValueAndValidity();
                startPageControl.updateValueAndValidity();
                endPageControl.updateValueAndValidity();
            }
        });
    }

    subscribeExportTypeFormDependency(): void {
        this.exportTypeFormGroup.get('exportType').valueChanges.subscribe(exportType => {
            this.communicationService.emitExportTypeChange(exportType);
        });
    }

    stepChanged(event, stepper): void {
        if (event.previouslySelectedIndex > event.selectedIndex) {
            stepper.selected.interacted = false;
        }
        else {
            stepper.selected.interacted = true;
        }
    }
}
