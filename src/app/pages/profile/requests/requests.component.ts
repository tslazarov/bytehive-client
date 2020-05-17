import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { ScrapeRequestsService } from '../../../services/scraperequests.service';
import { ListProfileRequest } from '../../../models/listprofilerequest.model';
import { environment } from '../../../../environments/environment';
import { Constants } from '../../../utilities/constants';
import { ConfirmationData, ConfirmationDialog } from '../../../utilities/dialogs/confirmation/confirmation.dialog';
import { NotifierService } from 'angular-notifier';
import { FileManagerHelper } from '../../../utilities/helpers/filemanager-helper';

@Component({
    selector: 'bh-profile-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {

    @Output() profileChange = new EventEmitter<any>();
    @Input() tokens: number;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild('downloadFileLink', { static: false }) downloadFileLink: ElementRef;

    // common
    displayedColumns: string[] = ['creationDate', 'status', 'entries', 'action'];
    dataSource: MatTableDataSource<any>;
    scrapeRequests: ListProfileRequest[];
    triggerStatusUpdate: boolean;
    notifier: NotifierService;

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
    pollenLabel: string;

    constructor(private dialog: MatDialog,
        private fileManagerHelper: FileManagerHelper,
        private scrapeRequestsService: ScrapeRequestsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private notifierService: NotifierService) {
        this.notifier = notifierService
    }

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
        this.pollenLabel = this.translationService.localizeValue('pollenLabel', 'requests-profile', 'label');
    }

    unlock(id: string): void {
        let scrapeRequest = this.scrapeRequests.find(i => i.id == id);

        if (this.tokens * 100 > scrapeRequest.entries) {
            let confirmationData = new ConfirmationData();
            let message = this.translationService.localizeValue('confirmUnlockScrapeRequestLabel', 'requests-profile', 'label');
            confirmationData.message = `${message} ${Math.ceil(scrapeRequest.entries / 100)} ${this.pollenLabel}.`

            let dialogRef = this.dialog.open(ConfirmationDialog, { width: '40vw', minHeight: '200px', autoFocus: false, data: confirmationData });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.scrapeRequestsService.unlockScrapeRequest(id)
                        .subscribe(result => {
                            if (result) {
                                this.notifier.notify("success", this.translationService.localizeValue('unlockRequestSuccessLabel', 'requests-profile', 'label'));

                                this.profileChange.emit();
                                this.fetchScrapeRequests();
                            }
                        }, (error) => {
                            this.notifier.notify("error", this.translationService.localizeValue('unlockRequestErrorLabel', 'requests-profile', 'label'));
                        });
                }
            });
        }
    }

    download(fileName: string, contentType: string, id: string): void {
        this.scrapeRequestsService.downloadScrapeRequest(id)
            .subscribe((result) => {
                let url = this.fileManagerHelper.downLoadFileUrl(result, contentType);

                const link = this.downloadFileLink.nativeElement;
                link.href = url;
                link.download = fileName;
                link.click();

                window.URL.revokeObjectURL(url);
            });
    }
}
