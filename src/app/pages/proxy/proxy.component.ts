import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { CommunicationService } from '../../services/utilities/communication.service';

@Component({
    selector: 'app-proxy',
    templateUrl: './proxy.component.html',
    styleUrls: ['./proxy.component.css']
})
export class ProxyComponent implements OnInit, OnDestroy {

    // Common
    showLoading: boolean;
    url: string;
    content: string;

    // Subscriptions
    urlSubscription: Subscription;

    constructor(private route: ActivatedRoute,
        private clientService: ClientService,
        private chgRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.urlSubscription = this.route.queryParams.subscribe(params => {
            this.url = params['url'];

            if (this.url != "") {
                this.showLoading = true;
                this.clientService.getPageMarkup(this.url)
                    .subscribe((result) => {
                        this.content = result;
                        this.showLoading = false;
                        setTimeout(() => {
                            this.chgRef.detach();
                            this.showLoading = false;
                        }, 3000);
                    }, (error) => {
                        // TODO: Page cannot be loaded
                        console.log('');
                    })
            }
        });

    }

    ngOnDestroy(): void {
        this.urlSubscription.unsubscribe();
    }

    getSelection() {
        this.chgRef.detach();

        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        }

        window.parent.postMessage(text, '*');

        console.log(text);
    }
}
