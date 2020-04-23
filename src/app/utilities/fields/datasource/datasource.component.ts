import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { ScrapeType } from '../../../models/enums/scrapetype.enum';
import { DetailModeType } from '../../../models/enums/detailmode.enum';
import { Constants } from '../../constants';
import { PagingInformationDialog } from '../../dialogs/paginginformation/paginginformation.dialog';
import { MatDialog } from '@angular/material';
import { FieldMapping } from '../../../models/fieldmapping.model';
import { CodeData, CodeDialog } from '../../dialogs/code/code.dialog';
import { first } from 'rxjs/operators';
import { AutomaticData, AutomaticDialog } from '../../dialogs/automatic/automatic.dialog';
import { ManualData, ManualDialog } from '../../dialogs/manual/manual.dialog';
import { Subscription } from 'rxjs';
import { VisualData, VisualDialog } from '../../dialogs/visual/visual.dialog';
import { ScraperService } from '../../../services/scraper.service';
import { ValidateList } from '../../../models/validatelist.model';

@Component({
    selector: 'bh-datasource',
    templateUrl: './datasource.component.html',
    styleUrls: ['./datasource.component.css']
})
export class DatasourceComponent implements OnInit, OnDestroy {

    @Input() parentForm: FormGroup;
    @Input() scrapeType: ScrapeType;

    // subscriptions
    languageChangeSubscription: Subscription;

    // common
    detailUrlModes = DetailModeType;
    selectedDetailUrlMode: DetailModeType;
    showSuccessMessage: boolean;
    showErrorMessage: boolean;

    // labels
    dataSourceLabel: string;
    listUrlLabel: string;
    pagingLabel: string;
    startPageLabel: string;
    endPageLabel: string;
    detailUrlModeLabel: string;
    listModeLabel: string;
    fileModeLabel: string;
    listInputLabel: string;
    linksDetectedLabel: string;
    insertAnchorMarkupLabel: string;
    automaticLabel: string;
    codeLabel: string;
    manualLabel: string;
    visualLabel: string;
    validateLabel: string;
    successMessageLabel: string;
    errorMessageLabel: string;

    constructor(private clientService: ClientService,
        private dialog: MatDialog,
        private communicationService: CommunicationService,
        private translationService: TranslationService,
        private scraperService: ScraperService) { }

    ngOnInit(): void {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });

        this.selectedDetailUrlMode = this.detailUrlModes.List;
        this.detailUrlModeLabel = this.listModeLabel;
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.dataSourceLabel = this.translationService.localizeValue('dataSourceLabel', 'datasource', 'label');
        this.listUrlLabel = this.translationService.localizeValue('listUrlLabel', 'datasource', 'label');
        this.pagingLabel = this.translationService.localizeValue('pagingLabel', 'datasource', 'label');
        this.startPageLabel = this.translationService.localizeValue('startPageLabel', 'datasource', 'label');
        this.endPageLabel = this.translationService.localizeValue('endPageLabel', 'datasource', 'label');
        this.listModeLabel = this.translationService.localizeValue('listModeLabel', 'datasource', 'label');
        this.fileModeLabel = this.translationService.localizeValue('fileModeLabel', 'datasource', 'label');
        this.listInputLabel = this.translationService.localizeValue('listInputLabel', 'datasource', 'label');
        this.linksDetectedLabel = this.translationService.localizeValue('linksDetectedLabel', 'datasource', 'label');
        this.insertAnchorMarkupLabel = this.translationService.localizeValue('insertAnchorMarkupLabel', 'datasource', 'label');
        this.automaticLabel = this.translationService.localizeValue('automaticLabel', 'datasource', 'label');
        this.codeLabel = this.translationService.localizeValue('codeLabel', 'datasource', 'label');
        this.manualLabel = this.translationService.localizeValue('manualLabel', 'datasource', 'label');
        this.visualLabel = this.translationService.localizeValue('visualLabel', 'datasource', 'label');
        this.validateLabel = this.translationService.localizeValue('validateLabel', 'datasource', 'label');
    }

    changeDetailMode(mode: DetailModeType): void {
        this.selectedDetailUrlMode = mode;
        this.parentForm.controls.detailUrls.patchValue([]);

        if (this.selectedDetailUrlMode == this.detailUrlModes.List) {
            this.detailUrlModeLabel = this.listModeLabel;
        }
        else {
            this.detailUrlModeLabel = this.fileModeLabel;
        }
    }

    convertToArray(event: any): void {
        let value = event.target.value;
        let lines = value.split(/[\r\n]+/);
        lines = lines.filter(l => l.match(Constants.URL_REGEX));

        this.parentForm.controls.detailUrls.patchValue(lines);
    }

    pagingInformation(): void {
        let dialogRef = this.dialog.open(PagingInformationDialog, { width: '50vw', minHeight: '220px', autoFocus: false });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    automaticMapping(): void {
        if (!this.parentForm.value.listUrl || this.parentForm.controls['listUrl'].invalid) {
            this.parentForm.controls['listUrl'].markAsTouched();
            return;
        }

        let page = this.parentForm.controls['startPage'].value ? this.parentForm.controls['startPage'].value : 0;
        let url = this.parentForm.value.listUrl.replace(Constants.PAGING_REGEX, page);

        let automaticData = new AutomaticData();
        automaticData.markup = this.parentForm.value.detailMarkup;
        automaticData.url = url;
        automaticData.scrapeLink = true;

        let dialogRef = this.dialog.open(AutomaticDialog, { width: '60vw', minHeight: '380px', autoFocus: false, data: automaticData });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.markup) {
                this.parentForm.patchValue({ detailMarkup: result.markup });
            }
        });
    }

    visualMapping(): void {
        if (!this.parentForm.value.listUrl || this.parentForm.controls['listUrl'].invalid) {
            this.parentForm.controls['listUrl'].markAsTouched();
            return;
        }

        let page = this.parentForm.controls['startPage'].value ? this.parentForm.controls['startPage'].value : 0;
        let url = this.parentForm.value.listUrl.replace(Constants.PAGING_REGEX, page);

        let visualData = new VisualData();
        visualData.markup = this.parentForm.value.detailMarkup;
        visualData.proxyUrl = '/proxy?url=' + url;
        visualData.url = url;
        visualData.scrapeLink = true;

        let dialogRef = this.dialog.open(VisualDialog, { width: '90vw', minHeight: '380px', autoFocus: false, data: visualData });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.markup) {
                this.parentForm.patchValue({ detailMarkup: result.markup });
            }
        });
    }

    codeMapping(): void {
        if (!this.parentForm.value.listUrl || this.parentForm.controls['listUrl'].invalid) {
            this.parentForm.controls['listUrl'].markAsTouched();
            return;
        }

        let page = this.parentForm.controls['startPage'].value ? this.parentForm.controls['startPage'].value : 0;
        let url = this.parentForm.value.listUrl.replace(Constants.PAGING_REGEX, page);

        this.clientService.getPageMarkup(url, false)
            .pipe(first())
            .subscribe((markup) => {
                let codeData = new CodeData();
                codeData.code = markup;
                codeData.markup = this.parentForm.value.detailMarkup;
                codeData.url = url;
                codeData.scrapeLink = true;

                let dialogRef = this.dialog.open(CodeDialog, { width: '90vw', height: '90vh', autoFocus: false, data: codeData });

                dialogRef.afterClosed().subscribe(result => {
                    if (result && result.markup) {
                        this.parentForm.patchValue({ detailMarkup: result.markup });
                    }
                });
            });
    }

    manualMapping(): void {
        let manualData = new ManualData();
        manualData.markup = this.parentForm.value.detailMarkup;

        let dialogRef = this.dialog.open(ManualDialog, { width: '60vw', minHeight: '380px', autoFocus: false, data: manualData });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.markup) {
                this.parentForm.patchValue({ detailMarkup: result.markup });
            }
        });
    }

    validate(): void {
        if (!this.parentForm.value.listUrl || this.parentForm.controls['listUrl'].invalid || !this.parentForm.value.detailMarkup || this.parentForm.controls['detailMarkup'].invalid) {
            this.parentForm.controls['listUrl'].markAsTouched();
            this.parentForm.controls['detailMarkup'].markAsTouched();
            return;
        }

        let page = this.parentForm.controls['startPage'].value ? this.parentForm.controls['startPage'].value : 0;
        let url = this.parentForm.value.listUrl.replace(Constants.PAGING_REGEX, page);

        let validateList = new ValidateList();
        validateList.url = url;
        validateList.markup = this.parentForm.controls['detailMarkup'].value;

        this.scraperService.validateList(validateList).subscribe((result) => {
            if (result) {
                this.showSuccessMessage = true;
                this.successMessageLabel = this.translationService.localizeValue('detailLinksFoundLabel', 'datasource', 'label');
            }
            else {
                this.showErrorMessage = true;
                this.errorMessageLabel = this.translationService.localizeValue('detailLinksNotFoundLabel', 'datasource', 'label');
            }

            setTimeout(() => {
                this.showErrorMessage = false;
                this.showSuccessMessage = false;
            }, 4000);

        }, (error) => {
            this.showErrorMessage = true;
            this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'datasource', 'label');
            setTimeout(() => { this.showErrorMessage = false }, 4000);
        })
    }
}
