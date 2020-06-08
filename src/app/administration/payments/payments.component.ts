import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { ListScrapeRequest } from '../../models/listscraperequest.model';
import { ConfirmationData, ConfirmationDialog } from '../../utilities/dialogs/confirmation/confirmation.dialog';
import { Constants } from '../../utilities/constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ListPayment } from '../../models/listpayment.model';
import { PaymentsService } from '../../services/payments.service';
import { PaymentStatus } from '../../models/enums/paymentstatus.enum';
import { PaymentDetailDialog, PaymentDetailData } from '../../utilities/dialogs/paymentdetail/paymentdetail.dialog';

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
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.css'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: localStorage.getItem(Constants.LANGUAGE_KEY) },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
})
export class PaymentsComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    displayedColumns: string[] = ['creationDate', 'email', 'status', 'price', 'externalId', 'action'];

    dataSource: MatTableDataSource<any>;
    providers: any[];
    payments: ListPayment[];
    triggerStatusUpdate: boolean;
    paymentStatuses: any;
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
    priceLabel: string;
    currencyLabel: string;
    externalIdLabel: string;
    detailsLabel: string;
    deleteLabel: string;
    confirmDeletePaymentLabel: string;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
        private paymentsService: PaymentsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
            this.triggerStatusUpdate = this.triggerStatusUpdate === true ? false : true;
        });

        this.fetchPayments();
        this.initializeDates();
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchPayments(): void {
        this.payments = [];
        this.paymentsService.getAll()
            .subscribe(result => {
                result.forEach(payment => {
                    var listPayment = payment as ListPayment;
                    this.payments.push(listPayment);
                });

                this.bindDataSource(this.payments);
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
        this.statusesLabel = this.translationService.localizeValue('statusesLabel', 'payments', 'label');
        this.searchLabel = this.translationService.localizeValue('searchLabel', 'payments', 'label');
        this.filterDateLabel = this.translationService.localizeValue('filterDateLabel', 'payments', 'label');
        this.creationDateLabel = this.translationService.localizeValue('creationDateLabel', 'payments', 'label');
        this.userLabel = this.translationService.localizeValue('userLabel', 'payments', 'label');
        this.statusLabel = this.translationService.localizeValue('statusLabel', 'payments', 'label');
        this.priceLabel = this.translationService.localizeValue('priceLabel', 'payments', 'label');
        this.currencyLabel = this.translationService.localizeValue('currencyLabel', 'payments', 'label');
        this.externalIdLabel = this.translationService.localizeValue('externalIdLabel', 'payments', 'label');
        this.detailsLabel = this.translationService.localizeValue('detailsLabel', 'payments', 'label');
        this.deleteLabel = this.translationService.localizeValue('deleteLabel', 'payments', 'label');
        this.confirmDeletePaymentLabel = this.translationService.localizeValue('confirmDeletePaymentLabel', 'payments', 'label');

        this.fetchStatuses();
    }

    fetchStatuses() {
        this.paymentStatuses = [];

        this.paymentStatuses.push({ 'value': -1, 'label': this.translationService.localizeValue('allStatusLabel', 'payment-status', 'label') });
        this.paymentStatuses.push({ 'value': PaymentStatus.Pending, 'label': this.translationService.localizeValue('pendingStatusLabel', 'payment-status', 'label') });
        this.paymentStatuses.push({ 'value': PaymentStatus.Completed, 'label': this.translationService.localizeValue('completedStatusLabel', 'payment-status', 'label') });
        this.paymentStatuses.push({ 'value': PaymentStatus.Cancelled, 'label': this.translationService.localizeValue('cancelledStatusLabel', 'payment-status', 'label') });
        this.paymentStatuses.push({ 'value': PaymentStatus.Failed, 'label': this.translationService.localizeValue('failedStatusLabel', 'payment-status', 'label') });
    }


    statusChange(status: any): void {
        let filteredPayments = status.value == -1 ? this.payments : this.payments.filter(payment => { return payment.status == status.value });

        this.bindDataSource(filteredPayments);
    }

    setAndPredicate() {
        this.dataSource.filterPredicate = (c: ListPayment, filter: any) => {
            let result = true;
            let keys = Object.keys(c);

            for (const key of keys) {
                let searchCondition = filter.conditions[key]; // get search filter method
                if (searchCondition && searchCondition !== 'none') {
                    if (filter.methods[searchCondition](c[key], filter.values[key]) === false) { // invoke search filter 
                        if (key == 'creationDate') {
                            result = false;
                            break;
                        }

                        result = false;
                    }
                    else {
                        if (key != 'creationDate') {
                            result = true;
                            break;
                        }
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

        this.searchValue = this.filterValue ? { 'email': filterValue, 'externalId': filterValue, 'creationDate': [this.startDate, this.endDate] } : { 'creationDate': [this.startDate, this.endDate] };
        this.searchCondition = this.filterValue ? { 'email': 'contains', 'externalId': 'contains', 'creationDate': 'between-date-equal' } : { 'creationDate': 'between-date-equal' };

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
        this.paymentsService.getPayment(id).subscribe(result => {
            if (result) {
                let paymentDetailData = result as PaymentDetailData;

                let dialogRef = this.dialog.open(PaymentDetailDialog, { width: '800px', minHeight: '450px', autoFocus: false, data: paymentDetailData });

                dialogRef.afterClosed().subscribe();
            }
        }, (error) => {

        });
    }

    delete(id: string): void {
        let confirmationData = new ConfirmationData();
        confirmationData.message = this.translationService.localizeValue('confirmDeletePaymentLabel', 'payments', 'label');

        let dialogRef = this.dialog.open(ConfirmationDialog, { width: '40vw', minHeight: '200px', autoFocus: false, data: confirmationData });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.paymentsService.deletePayment(id)
                    .subscribe((result) => {
                        if (result) {
                            let deletedPaymentIndex = this.payments.map(i => i.id).indexOf(id);

                            this.payments.splice(deletedPaymentIndex, 1);
                            this.bindDataSource(this.payments);
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
