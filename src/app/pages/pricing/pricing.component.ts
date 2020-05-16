import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../services/payments.service';
import { PayPalPaymentDialog, PayPalPaymentData } from '../../utilities/dialogs/paypalpayment/paypalpayment.dialog';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/utilities/communication.service';
import { TranslationService } from '../../services/utilities/translation.service';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AuthLocalService } from '../../services/utilities/auth.service';
import { first } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'app-pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

    // subscriptions
    languageChangeSubscription: Subscription;

    // common
    paymentTiers: PaymentTier[];
    notifier: NotifierService;

    // labels
    pricingLabel: string;
    currencyLabel: string;
    pollenLabel: string;
    purchaseNowLabel: string;

    constructor(private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private paymentService: PaymentsService,
        private communicationService: CommunicationService,
        private authLocalService: AuthLocalService,
        private notifierService: NotifierService,
        private translationService: TranslationService) {
        this.notifier = notifierService;
    }

    ngOnInit() {
        this.paymentTiers = [];

        this.paymentService.getAllTiers()
            .subscribe((result) => {
                result.forEach(tier => {
                    var paymentTier = new PaymentTier();
                    paymentTier.labelName = `${tier.name.toLowerCase()}Label`
                    paymentTier.name = this.translationService.localizeValue(paymentTier.labelName, 'pricing', 'label');
                    paymentTier.tierName = tier.name;
                    paymentTier.description = tier.description;
                    paymentTier.price = tier.price;
                    paymentTier.value = tier.value;

                    this.paymentTiers.push(paymentTier);
                });
            })


        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
            this.paymentTiers.forEach(pt => {
                pt.name = this.translationService.localizeValue(pt.labelName, 'pricing', 'label');
            })
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.pricingLabel = this.translationService.localizeValue('pricingLabel', 'pricing', 'label');
        this.currencyLabel = this.translationService.localizeValue('currencyLabel', 'pricing', 'label');
        this.pollenLabel = this.translationService.localizeValue('pollenLabel', 'pricing', 'label');
        this.purchaseNowLabel = this.translationService.localizeValue('purchaseNowLabel', 'pricing', 'label');
    }

    purchase(tier: string, price: number): void {
        this.authLocalService.isAuthenticated()
            .pipe(first())
            .subscribe((authenticated) => {
                if (authenticated) {
                    this.handlePayment(tier, price);
                }
                else {
                    let url = this.getUrl(this.route.snapshot);
                    localStorage.setItem('bh_callback', url);

                    this.router.navigate(['/signin']);
                }
            });
    }

    handlePayment(tier: string, price: number): void {
        let payPalPaymentData = new PayPalPaymentData();
        payPalPaymentData.tier = tier;
        payPalPaymentData.price = price;

        let dialogRef = this.dialog.open(PayPalPaymentDialog, { width: '450px', minHeight: '100px', autoFocus: false, data: { payPalPaymentData } });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notifier.notify("success", this.translationService.localizeValue('paymentSuccessLabel', 'pricing', 'label'));
            }
        });
    }

    getUrl(route: ActivatedRouteSnapshot): string {
        return route.pathFromRoot
            .filter(v => v.routeConfig)
            .map(v => v.routeConfig!.path)
            .join('/');
    }
}

export class PaymentTier {
    labelName: string;
    name: string;
    tierName: string;
    price: number;
    value: number;
    description: string;
} 
