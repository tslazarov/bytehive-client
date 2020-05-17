import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { ScrapeRequestsService } from '../../../services/scraperequests.service';
import { ListProfileRequest } from '../../../models/listprofilerequest.model';
import { environment } from '../../../../environments/environment';
import { Constants } from '../../../utilities/constants';

@Component({
    selector: 'bh-profile-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    // common
    displayedColumns: string[] = ['creationDate', 'status', 'entries', 'action'];
    dataSource: MatTableDataSource<any>;
    scrapeRequests: ListProfileRequest[];
    triggerStatusUpdate: boolean;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    requestsLabel: string;
    creationDateLabel: string;
    statusLabel: string;
    entriesCountLabel: string;
    entriesLabel: string;
    detailsLabel: string;
    unlockLabel: string;
    downloadLabel: string;
    shareLabel: string;

    constructor(private scrapeRequestsService: ScrapeRequestsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
            this.triggerStatusUpdate = this.triggerStatusUpdate === true ? false : true;
        });

        this.fetchScrapeRequests();
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchScrapeRequests(): void {
        this.scrapeRequests = [];
        this.scrapeRequestsService.getProfileAll()
            .subscribe(result => {
                result.forEach(scrapeRequest => {
                    var listScrapeRequest = scrapeRequest as ListProfileRequest;

                    listScrapeRequest.downloadUrl = `${environment.apiBaseUrl}${Constants.SCRAPE_REQUEST_SERVICE_FILE_ENDPOINT}/${listScrapeRequest.id}`;
                    listScrapeRequest.shareableDownloadUrl = `${environment.apiBaseUrl}${Constants.SCRAPE_REQUEST_SERVICE_FILE_ENDPOINT}/${listScrapeRequest.id}?accessKey=${scrapeRequest.accessKey}`;

                    this.scrapeRequests.push(listScrapeRequest);
                });

                this.bindDataSource(this.scrapeRequests);
            });
    }

    bindDataSource(data: any): void {
        this.dataSource = new MatTableDataSource<ListProfileRequest>(data);
        this.dataSource.paginator = this.paginator;
    }

    setLabelsMessages(): void {
        this.requestsLabel = this.translationService.localizeValue('requestsLabel', 'requests-profile', 'label');
        this.creationDateLabel = this.translationService.localizeValue('creationDateLabel', 'requests-profile', 'label');
        this.statusLabel = this.translationService.localizeValue('statusLabel', 'requests-profile', 'label');
        this.entriesCountLabel = this.translationService.localizeValue('entriesCountLabel', 'requests-profile', 'label');
        this.entriesLabel = this.translationService.localizeValue('entriesLabel', 'requests-profile', 'label');
        this.detailsLabel = this.translationService.localizeValue('detailsLabel', 'requests-profile', 'label');
        this.unlockLabel = this.translationService.localizeValue('unlockLabel', 'requests-profile', 'label');
        this.downloadLabel = this.translationService.localizeValue('downloadLabel', 'requests-profile', 'label');
        this.shareLabel = this.translationService.localizeValue('shareLabel', 'requests-profile', 'label');
    }
}
