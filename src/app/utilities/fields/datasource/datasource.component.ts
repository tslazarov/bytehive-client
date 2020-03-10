import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { CommunicationService } from '../../../services/communication.service';
import { TranslationService } from '../../../services/translation.service';
import { CrawType } from '../../../models/enums/crawtype.enum';
import { DetailModeType } from '../../../models/enums/detailmode.enum';
import { Constants } from '../../constants';
import { PagingInformationDialog } from '../../dialogs/paginginformation/paginginformation.dialog';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'bh-datasource',
    templateUrl: './datasource.component.html',
    styleUrls: ['./datasource.component.css']
})
export class DatasourceComponent implements OnInit, OnDestroy {

    @Input() parentForm: FormGroup;
    @Input() crawType: CrawType;

    // subscriptions
    languageChangeSubscription: any;

    // common
    detailUrlModes = DetailModeType;
    selectedDetailUrlMode: DetailModeType;

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
    dragDropLabel: string;
    orLabel: string;
    browseFileLabel: string;
    fileInstructionsLabel: string;
    linksDetectedLabel: string;
    validateLabel: string;

    constructor(private clientService: ClientService,
        private dialog: MatDialog,
        private communicationService: CommunicationService,
        private translationService: TranslationService) { }

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
        this.validateLabel = this.translationService.localizeValue('validateLabel', 'datasource', 'label');
        this.linksDetectedLabel = this.translationService.localizeValue('linksDetectedLabel', 'datasource', 'label');
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
        let dialogRef = this.dialog.open(PagingInformationDialog, { width: '50vw', height: '220px', autoFocus: false });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }
}
