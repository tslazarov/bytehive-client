import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '../../../services/utilities/translation.service';
import { IPayPalConfig } from 'ngx-paypal';
import { environment } from '../../../../environments/environment';
import { Constants } from '../../constants';

@Component({
    selector: 'paypalpayment-dialog',
    templateUrl: './paypalpayment-dialog.html',
    styleUrls: ['./paypalpayment.dialog.css']
})
export class PayPalPaymentDialog {
    payPalConfig?: IPayPalConfig;

    constructor(public dialogRef: MatDialogRef<PayPalPaymentDialog>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.setLabelsMessages();
        this.initConfig(data.payPalPaymentData.tier, data.payPalPaymentData.price);
    }

    setLabelsMessages(): void {
    }

    initConfig(tier: string, price: number): void {
        let token = localStorage.getItem('bh_auth_token');

        this.payPalConfig = {
            clientId: environment.paypalClientId,
            currency: 'EUR',
            advanced: {
                extraQueryParams: [{ name: 'intent', value: 'authorize' }]
            },
            createOrderOnServer: (data) => fetch(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_CREATE_ENDPOINT}`, {
                method: 'post', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'provider': 'paypal',
                    'tier': tier,
                    'price': price
                })
            })
                .then((res) => res.json())
                .then((order) => {
                    var parsedOrder = JSON.parse(order);

                    return parsedOrder.id;
                }),
            authorizeOnServer: (approveData) => fetch(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_AUTHORIZE_ENDPOINT}`, {
                method: 'post', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'provider': 'paypal',
                    'orderId': approveData.orderID
                })
            }).then((res) => {
                return res.json();
            }).then((details) => {
                this.verifyPayment(details);
            }),
            onApprove: (data) => {
                console.log(data);
            },
            onError: err => {
                console.log('OnError', err);
            }
        };
    }

    verifyPayment(details: any) {
        let token = localStorage.getItem('bh_auth_token');

        var order = JSON.parse(details);
        fetch(`${environment.apiBaseUrl}${Constants.PAYMENT_SERVICE_VERIFY_ENDPOINT}`, {
            method: 'post', headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'provider': 'paypal',
                'orderId': order.id
            })
        }).then((res) => {
            return res.json();
        }).then((details) => {
        });
    }

    close(): void {
        this.dialogRef.close();
    }
}

export class PayPalPaymentData {
    tier: string;
    price: number;
}