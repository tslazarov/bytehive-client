import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldMapping } from '../../../models/fieldmapping.model';
import { ScrapeType } from '../../../models/enums/scrapetype.enum';
import { ExportType } from '../../../models/enums/exporttype.enum';
import { TranslationService } from '../../../services/utilities/translation.service';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LinksViewDialog, LinksViewData } from '../../dialogs/linksview/linksview.dialog';

@Component({
    selector: 'bh-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

    @Input() scrapeTypeForm: FormGroup;
    @Input() dataSourceMappingForm: FormGroup;
    @Input() exportTypeForm: FormGroup;
    @Input() fieldMappings: FieldMapping[];

    // subscriptions
    scrapeTypeChangeSubscription: Subscription;
    exportTypeChangeSubscription: Subscription;
    languageChangeSubscription: Subscription;

    // common
    scrapeTypeIcon: string;
    scrapeTypeTitleLabel: string;
    scrapeTypeDescriptionLabel: string;
    exportTypeIcon: string;
    exportTypeTitleLabel: string;
    exportTypeDescriptionLabel: string;
    scrapeType: ScrapeType;
    exportType: ExportType;

    // labels
    dataSourceLabel: string;
    listUrlLabel: string;
    startPageLabel: string;
    endPageLabel: string;
    detailMarkupLabel: string;
    detailLinksCountLabel: string;
    dataMappingLabel: string;
    nameLabel: string;
    markupLabel: string;

    constructor(private dialog: MatDialog,
        private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.scrapeTypeChangeSubscription = this.communicationService.scrapeTypeChangeEmitted.subscribe(scrapeType => {
            this.scrapeType = scrapeType;
            this.setScrapeTypeTile(scrapeType);
        });

        this.exportTypeChangeSubscription = this.communicationService.exportTypeChangeEmitted.subscribe(exportType => {
            this.exportType = exportType;
            this.setExportTypeTile(exportType);
        });

        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
        this.scrapeTypeChangeSubscription.unsubscribe();
        this.exportTypeChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.dataSourceLabel = this.translationService.localizeValue('dataSourceLabel', 'summary', 'label');
        this.listUrlLabel = this.translationService.localizeValue('listUrlLabel', 'summary', 'label');
        this.startPageLabel = this.translationService.localizeValue('startPageLabel', 'summary', 'label');
        this.endPageLabel = this.translationService.localizeValue('endPageLabel', 'summary', 'label');
        this.detailMarkupLabel = this.translationService.localizeValue('detailMarkupLabel', 'summary', 'label');
        this.detailLinksCountLabel = this.translationService.localizeValue('detailLinksCountLabel', 'summary', 'label');
        this.dataMappingLabel = this.translationService.localizeValue('dataMappingLabel', 'summary', 'label');
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'summary', 'label');
        this.markupLabel = this.translationService.localizeValue('markupLabel', 'summary', 'label');

        this.setScrapeTypeTile(this.scrapeType);
        this.setExportTypeTile(this.exportType);
    }

    setScrapeTypeTile(scrapeType: ScrapeType): void {
        switch (scrapeType) {
            case (ScrapeType.ListDetail): {
                this.scrapeTypeIcon = "image listdetail-image";
                this.scrapeTypeTitleLabel = this.translationService.localizeValue('listDetailPagesLabel', 'scrapepicker', 'label');
                this.scrapeTypeDescriptionLabel = this.translationService.localizeValue('listDetailDescriptionLabel', 'scrapepicker', 'label');
                break;
            }
            case (ScrapeType.List): {
                this.scrapeTypeIcon = "image list-image";
                this.scrapeTypeTitleLabel = this.translationService.localizeValue('listPagesLabel', 'scrapepicker', 'label');;
                this.scrapeTypeDescriptionLabel = this.translationService.localizeValue('listDescriptionLabel', 'scrapepicker', 'label');
                break;
            }
            case (ScrapeType.Detail): {
                this.scrapeTypeIcon = "image detail-image";
                this.scrapeTypeTitleLabel = this.translationService.localizeValue('detailPagesLabel', 'scrapepicker', 'label');
                this.scrapeTypeDescriptionLabel = this.translationService.localizeValue('detailDescriptionLabel', 'scrapepicker', 'label');
                break;
            }
        }
    }

    setExportTypeTile(exportType: ExportType): void {
        switch (exportType) {
            case (ExportType.Csv): {
                this.exportTypeIcon = "image csv-image";
                this.exportTypeTitleLabel = this.translationService.localizeValue('csvFormatLabel', 'exportpicker', 'label');
                this.exportTypeDescriptionLabel = this.translationService.localizeValue('csvDescriptionLabel', 'exportpicker', 'label');
                break;
            }
            case (ExportType.Json): {
                this.exportTypeIcon = "image json-image";
                this.exportTypeTitleLabel = this.translationService.localizeValue('jsonFormatLabel', 'exportpicker', 'label');
                this.exportTypeDescriptionLabel = this.translationService.localizeValue('jsonDescriptionLabel', 'exportpicker', 'label');
                break;
            }
            case (ExportType.Txt): {
                this.exportTypeIcon = "image txt-image";
                this.exportTypeTitleLabel = this.translationService.localizeValue('txtFormatLabel', 'exportpicker', 'label');
                this.exportTypeDescriptionLabel = this.translationService.localizeValue('txtDescriptionLabel', 'exportpicker', 'label');
                break;
            }
            case (ExportType.Xml): {
                this.exportTypeIcon = "image xml-image";
                this.exportTypeTitleLabel = this.translationService.localizeValue('xmlFormatLabel', 'exportpicker', 'label');
                this.exportTypeDescriptionLabel = this.translationService.localizeValue('xmlDescriptionLabel', 'exportpicker', 'label');
                break;
            }
        }
    }

    viewLinks(): void {
        let linksViewData = new LinksViewData();
        linksViewData.links = this.dataSourceMappingForm.controls['detailUrls'].value;

        let dialogRef = this.dialog.open(LinksViewDialog, { width: '700px', minHeight: '450px', autoFocus: false, data: linksViewData });

        dialogRef.afterClosed().subscribe();
    }
}
