import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { ListScrapeRequest } from '../../models/listscraperequest.model';
import { ConfirmationData, ConfirmationDialog } from '../../utilities/dialogs/confirmation/confirmation.dialog';
import { ScrapeRequestsService } from '../../services/scraperequests.service';
import { Constants } from '../../utilities/constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { RequestStatus } from '../../models/enums/requeststatus.enum';
import { RequestDetailData, RequestDetailDialog } from '../../utilities/dialogs/requestdetail/requestdetail.dialog';

export const CONDITIONS_FUNCTIONS = {
    'contains': function (value, filteredValue) {
        if (value != null && filteredValue != null) {
            return value.toLowerCase().includes(filteredValue.toLowerCase());
        }

        return value.includes(filteredValue);
    },
    'between-date-equal': function (value, filteredValue) {
        let currentDate = new Date(value);
        return currentDate >= filteredValue[0] && currentDate <= filteredValue[1];
    }
};

@Component({
    selector: 'app-scraperequests',
    templateUrl: './scraperequests.component.html',
    styleUrls: ['./scraperequests.component.css'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: localStorage.getItem(Constants.LANGUAGE_KEY) },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
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
    filterDate: any;
    filterValue: string;
    minDate: Date;
    maxDate: Date;
    startDate: Date;
    endDate: Date;
    dateForm: FormGroup;

    searchValue: any = {};
    searchCondition: any = {};
    filterMethods = CONDITIONS_FUNCTIONS;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    statusesLabel: string;
    searchLabel: string;
    filterDateLabel: string;
    creationDateLabel: string;
    userLabel: string;
    statusLabel: string;
    linkLabel: string;
    detailsLabel: string;
    deleteLabel: string;
    confirmDeleteScrapeRequestLabel: string;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
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
        this.initializeDates();
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

    initializeDates(): any {
        this.minDate = new Date(2010, 0, 1);
        this.maxDate = new Date();

        this.dateForm = this.formBuilder.group({
            date: [{ begin: this.startDate, end: this.endDate }]
        });

        this.startDate = new Date(2010, 0, 1);
        this.endDate = new Date();
    }

    bindDataSource(data: any): void {
        this.dataSource = new MatTableDataSource<ListScrapeRequest>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setLabelsMessages(): void {
        this.statusesLabel = this.translationService.localizeValue('statusesLabel', 'scraperequests', 'label');
        this.searchLabel = this.translationService.localizeValue('searchLabel', 'scraperequests', 'label');
        this.filterDateLabel = this.translationService.localizeValue('filterDateLabel', 'scraperequests', 'label');
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
        this.scrapeRequestStatuses.push({ 'value': RequestStatus.Pending, 'label': this.translationService.localizeValue('pendingStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': RequestStatus.Started, 'label': this.translationService.localizeValue('startedStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': RequestStatus.Completed, 'label': this.translationService.localizeValue('completedStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': RequestStatus.Failed, 'label': this.translationService.localizeValue('failedStatusLabel', 'scrape-status', 'label') });
        this.scrapeRequestStatuses.push({ 'value': RequestStatus.Paid, 'label': this.translationService.localizeValue('paidStatusLabel', 'scrape-status', 'label') });
    }

    statusChange(status: any): void {
        let filteredRequests = status.value == -1 ? this.scrapeRequests : this.scrapeRequests.filter(user => { return user.status == status.value });

        this.bindDataSource(filteredRequests);
    }

    setAndPredicate() {
        this.dataSource.filterPredicate = (c: ListScrapeRequest, filter: any) => {
            let result = true;
            let keys = Object.keys(c);

            for (const key of keys) {
                let searchCondition = filter.conditions[key]; // get search filter method
                if (searchCondition && searchCondition !== 'none') {
                    if (filter.methods[searchCondition](c[key], filter.values[key]) === false) { // invoke search filter 
                        result = false // if one of the filters method not succeed the row will be remove from the filter result 
                        break;
                    }
                }
            }

            return result;
        };
    }

    applyGlobalFilter(filterValue: string): void {
        this.filterValue = filterValue;
        this.searchValue = {};
        this.searchCondition = {};

        this.setAndPredicate();

        this.searchValue = this.filterValue ? { 'email': filterValue, 'creationDate': [this.startDate, this.endDate] } : { 'creationDate': [this.startDate, this.endDate] };
        this.searchCondition = this.filterValue ? { 'email': 'contains', 'creationDate': 'between-date-equal' } : { 'creationDate': 'between-date-equal' };

        let searchFilter: any = {
            values: this.searchValue,
            conditions: this.searchCondition,
            methods: this.filterMethods
        }

        this.dataSource.filter = searchFilter;
    }

    onDateChange(event: any) {

        this.startDate = event.value.begin.toDate();
        this.endDate = event.value.end.toDate();

        if (this.startDate.getTime() == this.endDate.getTime()) {
            this.endDate.setDate(this.endDate.getDate() + 1);
        }

        this.applyGlobalFilter(this.filterValue);
    }

    showDetail(id: string): void {
        this.scrapeRequestsService.getScrapeRequest(id).subscribe(result => {
            if (result) {
                let requestDetailData = new RequestDetailData();
                requestDetailData.id = result.id;
                requestDetailData.creationDate = result.creationDate;
                requestDetailData.data = result.data;
                requestDetailData.downloadUrl = result.downloadUrl;
                requestDetailData.email = result.email;
                requestDetailData.exportType = result.exportType;
                requestDetailData.scrapeType = result.scrapeType;
                requestDetailData.status = result.status;

                let dialogRef = this.dialog.open(RequestDetailDialog, { width: '700px', minHeight: '450px', autoFocus: false, data: requestDetailData });

                dialogRef.afterClosed().subscribe();
            }
        }, (error) => {

        });
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
