import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { CommunicationService } from '../../../services/communication.service';
import { TranslationService } from '../../../services/translation.service';
import { CrawType } from '../../../models/enums/crawtype.enum';
import { DetailModeType } from '../../../models/enums/detailmode.enum';
import { Constants } from '../../constants';

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
    detailUrlModeLabel: string;

    constructor(private clientService: ClientService,
        private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });

        this.selectedDetailUrlMode = this.detailUrlModes.List;
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
    }

    changeDetailMode(mode: DetailModeType): void {
        this.selectedDetailUrlMode = mode;
        this.parentForm.controls.detailUrls.patchValue([]);

        if (this.selectedDetailUrlMode == this.detailUrlModes.List) {
            this.detailUrlModeLabel = 'List';
        }
        else {
            this.detailUrlModeLabel = 'File';
        }
    }

    convertToArray(event: any): void {
        let value = event.target.value;
        let lines = value.split(/[\r\n]+/);
        lines = lines.filter(l => l.match(Constants.URL_REGEX));

        this.parentForm.controls.detailUrls.patchValue(lines);
    }
}
