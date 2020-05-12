import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Constants } from '../../utilities/constants';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

    public payPalConfig?: IPayPalConfig;

    constructor() { }

    ngOnInit() {
        this.initConfig();
    }

    initConfig(): void {
        console.log('init');
        this.payPalConfig = {
            clientId: 'AaMSkmD3_aPX5RkufemL54vWvPs1RzsnDJgrE_dsFQTgFTFwemC6v1N-oGoIvO8-ujP4yHrI86D5I8CM',
            currency: 'EUR',
            // for creating orders (transactions) on server see
            // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
            createOrderOnServer: (data) => fetch(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_CREATE_ENDPOINT}`, {
                method: 'post', headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    'provider': 'paypal',
                    'tier': 'Enterprise',
                    'price': 20.5
                })
            })
                .then((res) => res.json())
                .then((order) => {
                    var parsedOrder = JSON.parse(order);

                    return parsedOrder.id;
                }),
            authorizeOnServer: (approveData) =>
                fetch('/my-server/authorize-paypal-transaction', {
                    body: JSON.stringify({
                        orderID: approveData.orderID
                    })
                }).then((res) => {
                    return res.json();
                }).then((details) => {
                    alert('Authorization created for ' + details.payer_given_name);
                }),
            onApprove: (data) => {
                console.log(data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            },
        };
    }
}
