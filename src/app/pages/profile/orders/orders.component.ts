import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { PaymentsService } from '../../../services/payments.service';
import { ListProfilePayment } from '../../../models/listprofilepayment.model';

@Component({
    selector: 'bh-profile-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    // common
    displayedColumns: string[] = ['creationDate', 'price', 'tierName', 'tierValue'];
    dataSource: MatTableDataSource<any>;
    payments: ListProfilePayment[];
    triggerStatusUpdate: boolean;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    ordersLabel: string;
    creationDateLabel: string;
    priceLabel: string;
    currencyLabel: string;
    pricingTierLabel: string;
    valueLabel: string;
    pollenLabel: string;

    constructor(private paymentsService: PaymentsService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
            this.triggerStatusUpdate = this.triggerStatusUpdate === true ? false : true;
            this.payments.forEach(pt => {
                let tierNameLabel = `${pt.tierName.toLowerCase()}Label`;
                pt.tierNameLabel = this.translationService.localizeValue(tierNameLabel, 'pricing', 'label');
            });
        });

        this.fetchPayments();
    }


    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchPayments(): void {
        this.payments = [];
        this.paymentsService.getProfileAll()
            .subscribe(result => {
                result.forEach(payment => {
                    var listPayment = payment as ListProfilePayment;
                    let tierNameLabel = `${listPayment.tierName.toLowerCase()}Label`;
                    listPayment.tierNameLabel = this.translationService.localizeValue(tierNameLabel, 'pricing', 'label');
                    this.payments.push(listPayment);
                });

                this.bindDataSource(this.payments);
            });
    }

    bindDataSource(data: any): void {
        this.dataSource = new MatTableDataSource<ListProfilePayment>(data);
        this.dataSource.paginator = this.paginator;
    }

    setLabelsMessages(): void {
        this.ordersLabel = this.translationService.localizeValue('ordersLabel', 'orders-profile', 'label');
        this.creationDateLabel = this.translationService.localizeValue('creationDateLabel', 'orders-profile', 'label');
        this.priceLabel = this.translationService.localizeValue('priceLabel', 'orders-profile', 'label');
        this.currencyLabel = this.translationService.localizeValue('currencyLabel', 'orders-profile', 'label');
        this.pricingTierLabel = this.translationService.localizeValue('pricingTierLabel', 'orders-profile', 'label');
        this.valueLabel = this.translationService.localizeValue('valueLabel', 'orders-profile', 'label');
        this.pollenLabel = this.translationService.localizeValue('pollenLabel', 'orders-profile', 'label');
    }
}
