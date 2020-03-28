import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldMapping } from '../../../models/fieldmapping.model';
import { ScrapeType } from '../../../models/enums/scrapetype.enum';
import { ExportType } from '../../../models/enums/exporttype.enum';
import { TranslationService } from '../../../services/translation.service';
import { CommunicationService } from '../../../services/communication.service';
import { Subscription } from 'rxjs';

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

    // common
    scrapeTypeIcon: string;
    scrapeTypeTitleLabel: string;
    scrapeTypeDescriptionLabel: string;
    exportTypeIcon: string;
    exportTypeTitleLabel: string;
    exportTypeDescriptionLabel: string;

    constructor(private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.scrapeTypeChangeSubscription = this.communicationService.exportTypeChangeEmitted.subscribe(e => {
            this.setScrapeTypeTile(e);
        });

        this.exportTypeChangeSubscription = this.communicationService.exportTypeChangeEmitted.subscribe(e => {
            this.setExportTypeTile(e);
        });
    }

    ngOnDestroy(): void {
        this.scrapeTypeChangeSubscription.unsubscribe();
        this.exportTypeChangeSubscription.unsubscribe();
    }

    setScrapeTypeTile(scrapeType: ScrapeType): void {
        switch (scrapeType) {
            case (ScrapeType.ListDetail): {
                this.scrapeTypeIcon = "image listdetail-image";
                this.scrapeTypeTitleLabel = "List & Detail";
                this.scrapeTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
            case (ScrapeType.List): {
                this.scrapeTypeIcon = "image list-image";
                this.scrapeTypeTitleLabel = "List";
                this.scrapeTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
            case (ScrapeType.Detail): {
                this.scrapeTypeIcon = "image detail-image";
                this.scrapeTypeTitleLabel = "Detail";
                this.scrapeTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
        }
    }

    setExportTypeTile(exportType: ExportType): void {
        switch (exportType) {
            case (ExportType.Csv): {
                this.exportTypeIcon = "image csv-image";
                this.exportTypeTitleLabel = "CSV Format";
                this.exportTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
            case (ExportType.Json): {
                this.exportTypeIcon = "image json-image";
                this.exportTypeTitleLabel = "JSON Format";
                this.exportTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
            case (ExportType.Txt): {
                this.exportTypeIcon = "image txt-image";
                this.exportTypeTitleLabel = "TXT Format";
                this.exportTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
            case (ExportType.Xml): {
                this.exportTypeIcon = "image xml-image";
                this.exportTypeTitleLabel = "XML Format";
                this.exportTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
        }
    }
}
