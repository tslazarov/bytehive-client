import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { ListScrapeRequest } from '../../models/listscraperequest.model';
import { ConfirmationData, ConfirmationDialog } from '../../utilities/dialogs/confirmation/confirmation.dialog';
import { ScrapeRequestsService } from '../../services/scraperequests.service';

export const CONDITIONS_FUNCTIONS = {
    "contains": function (value, filteredValue) {
        if (value != null && filteredValue != null) {
            return value.toLowerCase().includes(filteredValue.toLowerCase());
        }

        return value.includes(filteredValue);
    }
};

@Component({
    selector: 'app-scraperequests',
    templateUrl: './scraperequests.component.html',
    styleUrls: ['./scraperequests.component.css']
})
export class ScrapeRequestsComponent implements OnInit {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    displayedColumns: string[] = ['creationDate', 'email', 'status', 'downloadUrl', 'action'];

    dataSource: MatTableDataSource<any>;
    providers: any[];
    scrapeRequests: ListScrapeRequest[];
    triggerStatusUpdate: boolean;
    scrapeRequestStatuses: any;

    searchValue: any = {};
    searchCondition: any = {};
    filterMethods = CONDITIONS_FUNCTIONS;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    statusesLabel: string;
    searchLabel: string;
    creationDateLabel: string;
    userLabel: string;
    statusLabel: string;
    linkLabel: string;
    detailsLabel: string;
    deleteLabel: string;
    confirmDeleteScrapeRequestLabel: string;

    constructor(private router: Router,
        private dialog: MatDialog,
        private scrapeRequestsService: ScrapeRequestsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit(): void {
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
        this.scrapeRequestsService.getAll()
            .subscribe(result => {
                result.forEach(scrapeRequest => {
                    var listScrapeRequest = scrapeRequest as ListScrapeRequest;
                    this.scrapeRequests.push(listScrapeRequest);
                });

                this.bindDataSource(this.scrapeRequests);
            });
    }

    bindDataSource(data: any): void {
        this.dataSource = new MatTableDataSource<ListScrapeRequest>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setLabelsMessages(): void {
        this.statusesLabel = this.translationService.localizeValue('statusesLabel', 'scraperequests', 'label');
        this.searchLabel = this.translationService.localizeValue('searchLabel', 'scraperequests', 'label');
        this.creationDateLabel = this.translationService.localizeValue('creationDateLabel', 'scraperequests', 'label');
        this.userLabel = this.translationService.localizeValue('userLabel', 'scraperequests', 'label');
        this.statusLabel = this.translationService.localizeValue('statusLabel', 'scraperequests', 'label');
        this.linkLabel = this.translationService.localizeValue('linkLabel', 'scraperequests', 'label');
        this.detailsLabel = this.translationService.localizeValue('detailsLabel', 'scraperequests', 'label');
        this.deleteLabel = this.translationService.localizeValue('deleteLabel', 'scraperequests', 'label');
        this.confirmDeleteScrapeRequestLabel = this.translationService.localizeValue('confirmDeleteScrapeRequestLabel', 'scraperequests', 'label');

        this.fetchStatuses();
    }

    fetchStatuses() {
        this.scrapeRequestStatuses = [];

        this.scrapeRequestStatuses.push({ 'value': -1, 'label': this.translationService.localizeValue('allStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': 0, 'label': this.translationService.localizeValue('pendingStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': 1, 'label': this.translationService.localizeValue('startedStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': 2, 'label': this.translationService.localizeValue('completedStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': 3, 'label': this.translationService.localizeValue('failedStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': 4, 'label': this.translationService.localizeValue('paidStatusLabel', 'scrape-status', 'label') });
    }

    statusChange(status: any): void {
        let filteredRequests = status.value == -1 ? this.scrapeRequests : this.scrapeRequests.filter(user => { return user.status == status.value });

        this.bindDataSource(filteredRequests);
    }

    setOrPredicate(): void {
        this.dataSource.filterPredicate = (c: ListScrapeRequest, filter: any) => {
            let result = false;
            let keys = Object.keys(c);

            for (const key of keys) {
                let searchCondition = filter.conditions[key]; // get search filter method
                if (searchCondition && searchCondition !== 'none') {
                    if (filter.methods[searchCondition](c[key], filter.values[key]) === true) { // invoke search filter 
                        result = true // if one of the filters method not succeed the row will be remove from the filter result 
                        break;
                    }
                }
            }

            return result
        };
    }

    applyGlobalFilter(filterValue: string): void {
        this.searchValue = {};
        this.searchCondition = {};

        this.setOrPredicate();

        this.searchValue = { "email": filterValue };
        this.searchCondition = { "email": "contains", "name": "contains", "car": "contains" };

        let searchFilter: any = {
            values: this.searchValue,
            conditions: this.searchCondition,
            methods: this.filterMethods
        }

        this.dataSource.filter = searchFilter;
    }

    showDetail(id: string): void {

    }

    delete(id: string): void {

        let confirmationData = new ConfirmationData();
        confirmationData.message = this.translationService.localizeValue('confirmDeleteUserLabel', 'users', 'label');

        let dialogRef = this.dialog.open(ConfirmationDialog, { width: '40vw', minHeight: '200px', autoFocus: false, data: confirmationData });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.scrapeRequestsService.deleteScrapeRequest(id)
                    .subscribe((result) => {
                        if (result) {
                            let deletedScrapeRequestIndex = this.scrapeRequests.map(i => i.id).indexOf(id);

                            this.scrapeRequests.splice(deletedScrapeRequestIndex, 1);
                            this.bindDataSource(this.scrapeRequests);
                        }
                    }, (error) => {
                        //TODO: Show error message;
                    });
            }
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
