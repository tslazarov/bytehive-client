import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/utilities/communication.service';
import { TranslationService } from '../../services/utilities/translation.service';
import { UsersService } from '../../services/users.service';
import { DetailUser } from '../../models/detailuser.model';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Constants } from '../../utilities/constants';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ListProfileRequest } from '../../models/listprofilerequest.model';
import { ScrapeRequestsService } from '../../services/scraperequests.service';
import { FileManagerHelper } from '../../utilities/helpers/filemanager-helper';
import { ListProfilePayment } from '../../models/listprofilepayment.model';

@Component({
    selector: 'app-usersdetail',
    templateUrl: './usersdetail.component.html',
    styleUrls: ['./usersdetail.component.css']
})
export class UsersDetailComponent implements OnInit {
    @ViewChild('requestsPaginator', { static: false }) requestsPaginator: MatPaginator;
    @ViewChild('paymentsPaginator', { static: false }) paymentsPaginator: MatPaginator;
    @ViewChild('downloadFileLink', { static: false }) downloadFileLink: ElementRef;

    // common
    user: DetailUser;
    image: string;
    displayedRequestsColumns: string[] = ['creationDate', 'status', 'entries', 'downloadUrl'];
    requestsDataSource: MatTableDataSource<any>;
    displayedPaymentsColumns: string[] = ['creationDate', 'status', 'price', 'externalId'];
    paymentsDataSource: MatTableDataSource<any>;
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
    linkLabel: string;
    paymentsLabel: string;
    priceLabel: string;
    externalIdLabel: string;

    constructor(private route: ActivatedRoute,
        private fileManagerHelper: FileManagerHelper,
        private usersService: UsersService,
        private scrapeRequestsService: ScrapeRequestsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });

        this.route.params.subscribe(params => {
            this.fetchUser(params.id);
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchUser(id: string): void {
        this.usersService.getUser(id)
            .subscribe(result => {
                this.user = result as DetailUser;
                this.image = `${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_IMAGE_ENDPOINT}/${this.user.image}`;

                this.bindRequestsDataSource(this.user.scrapeRequests);
                this.bindPaymentsDataSource(this.user.payments);
            });
    }

    bindRequestsDataSource(data: any): void {
        this.requestsDataSource = new MatTableDataSource<ListProfileRequest>(data);
        this.requestsDataSource.paginator = this.requestsPaginator;
    }

    bindPaymentsDataSource(data: any): void {
        this.paymentsDataSource = new MatTableDataSource<ListProfilePayment>(data);
        this.paymentsDataSource.paginator = this.paymentsPaginator;
    }

    setLabelsMessages() {
        this.requestsLabel = this.translationService.localizeValue('requestsLabel', 'usersdetail', 'label');
        this.creationDateLabel = this.translationService.localizeValue('creationDateLabel', 'usersdetail', 'label');
        this.statusLabel = this.translationService.localizeValue('statusLabel', 'usersdetail', 'label');
        this.entriesCountLabel = this.translationService.localizeValue('entriesCountLabel', 'usersdetail', 'label');
        this.entriesLabel = this.translationService.localizeValue('entriesLabel', 'usersdetail', 'label');
        this.linkLabel = this.translationService.localizeValue('linkLabel', 'usersdetail', 'label');
        this.paymentsLabel = this.translationService.localizeValue('paymentsLabel', 'usersdetail', 'label');
        this.priceLabel = this.translationService.localizeValue('priceLabel', 'usersdetail', 'label');
        this.externalIdLabel = this.translationService.localizeValue('externalIdLabel', 'usersdetail', 'label');
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
