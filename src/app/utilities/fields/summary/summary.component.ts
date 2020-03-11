import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldMapping } from '../../../models/fieldmapping.model';
import { CrawType } from '../../../models/enums/crawtype.enum';
import { ExportType } from '../../../models/enums/exporttype.enum';
import { TranslationService } from '../../../services/translation.service';
import { CommunicationService } from '../../../services/communication.service';

@Component({
    selector: 'bh-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

    @Input() crawTypeForm: FormGroup;
    @Input() dataSourceMappingForm: FormGroup;
    @Input() exportTypeForm: FormGroup;
    @Input() fieldMappings: FieldMapping[];

    // subscriptions
    crawTypeChangeSubscription: any;
    exportTypeChangeSubscription: any;

    // common
    crawTypeIcon: string;
    crawTypeTitleLabel: string;
    crawTypeDescriptionLabel: string;
    exportTypeIcon: string;
    exportTypeTitleLabel: string;
    exportTypeDescriptionLabel: string;

    constructor(private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.crawTypeChangeSubscription = this.communicationService.exportTypeChangeEmitted.subscribe(e => {
            this.setCrawTypeTile(e);
        });

        this.exportTypeChangeSubscription = this.communicationService.exportTypeChangeEmitted.subscribe(e => {
            this.setExportTypeTile(e);
        });
    }

    ngOnDestroy(): void {
        this.crawTypeChangeSubscription.unsubscribe();
        this.exportTypeChangeSubscription.unsubscribe();
    }

    setCrawTypeTile(crawType: CrawType): void {
        switch (crawType) {
            case (CrawType.ListDetail): {
                this.crawTypeIcon = "image listdetail-image";
                this.crawTypeTitleLabel = "List & Detail";
                this.crawTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
            case (CrawType.List): {
                this.crawTypeIcon = "image list-image";
                this.crawTypeTitleLabel = "List";
                this.crawTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
                break;
            }
            case (CrawType.Detail): {
                this.crawTypeIcon = "image detail-image";
                this.crawTypeTitleLabel = "Detail";
                this.crawTypeDescriptionLabel = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
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
