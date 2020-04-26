import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { FieldMappingGroup } from '../../models/fieldmapping-group.model';
import { Constants } from '../../utilities/constants';
import { ScrapeType } from '../../models/enums/scrapetype.enum';
import { BhValidators } from '../../utilities/validators/bhvalidators';
import { Subscription } from 'rxjs';
import { ScrapeRequestCreate } from '../../models/scraperequestcreate.model';
import { ScrapeRequestsService } from '../../services/scraperequests.service';
import { FieldMapping } from '../../models/fieldmapping.model';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

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
    fieldMappings: FieldMappingGroup[];

    // common
    showSuccess: boolean;
    notifier: NotifierService;

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
    requestReceivedLabel: string;
    receiveEmailLabel: string;
    goProfileLabel: string;
    createRequestLabel: string;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private notifierService: NotifierService,
        private communicationService: CommunicationService,
        private scrapeRequestsService: ScrapeRequestsService) {
        this.notifier = notifierService;
    }

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
        this.requestReceivedLabel = this.translationService.localizeValue('requestReceivedLabel', 'hive', 'label');
        this.receiveEmailLabel = this.translationService.localizeValue('receiveEmailLabel', 'hive', 'label');
        this.goProfileLabel = this.translationService.localizeValue('goProfileLabel', 'hive', 'label');
        this.createRequestLabel = this.translationService.localizeValue('createRequestLabel', 'hive', 'label');
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

    confirm(): void {
        let scrapeRequestCreateModel = new ScrapeRequestCreate();

        scrapeRequestCreateModel.scrapeType = this.scrapeTypeFormGroup.controls['scrapeType'].value;
        scrapeRequestCreateModel.exportType = this.exportTypeFormGroup.controls['exportType'].value;
        scrapeRequestCreateModel.listUrl = this.dataSourceMappingFormGroup.controls['listUrl'].value;
        scrapeRequestCreateModel.hasPaging = this.dataSourceMappingFormGroup.controls['hasPaging'].value;
        scrapeRequestCreateModel.startPage = this.dataSourceMappingFormGroup.controls['startPage'].value;
        scrapeRequestCreateModel.endPage = this.dataSourceMappingFormGroup.controls['endPage'].value;
        scrapeRequestCreateModel.detailMarkup = this.dataSourceMappingFormGroup.controls['detailMarkup'].value;
        scrapeRequestCreateModel.detailUrls = this.dataSourceMappingFormGroup.controls['detailUrls'].value;
        scrapeRequestCreateModel.fieldMappings = this.fieldMappings.map(fm => { return new FieldMapping(fm.formGroup.controls['fieldName'].value, fm.formGroup.controls['fieldMarkup'].value) });

        this.scrapeRequestsService.createScrapeRequest(scrapeRequestCreateModel).subscribe((result) => {
            this.showSuccess = true;
        }, (error) => {
            this.notifier.notify("error", this.translationService.localizeValue('serverErrorLabel', 'hive', 'label'));
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
