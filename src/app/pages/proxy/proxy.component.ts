import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { TextSelectEvent, SelectionRectangle } from '../../utilities/directives/textselect/textselect.directive';
import { environment } from '../../../environments/environment';
import { TranslationService } from '../../services/utilities/translation.service';

@Component({
    selector: 'app-proxy',
    templateUrl: './proxy.component.html',
    styleUrls: ['./proxy.component.css']
})
export class ProxyComponent implements OnInit, OnDestroy {

    // common
    showLoading: boolean;
    url: string;
    content: string;
    selectedText: string;
    selectedElement: string;
    selectedElementName: string;
    hostRectangle: SelectionRectangle | null;

    @ViewChild('indicator', { static: false }) indicator: ElementRef;

    // Subscriptions
    urlSubscription: Subscription;

    // labels
    selectLabel: string;

    constructor(private route: ActivatedRoute,
        private clientService: ClientService,
        private translationService: TranslationService,
        private chgRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.urlSubscription = this.route.queryParams.subscribe(params => {
            this.url = params['url'];

            if (this.url != '') {
                this.showLoading = true;
                this.clientService.getPageMarkup(this.url, true)
                    .subscribe((result) => {
                        this.content = result;
                        this.showLoading = false;
                        setTimeout(() => {
                            this.chgRef.detach();
                            this.showLoading = false;
                            window.parent.postMessage({}, environment.origin);
                        }, 1000);
                    }, (error) => {
                        // TODO: Page cannot be loaded
                    })
            }
        });

        this.setLabelsMessage();
    }

    setLabelsMessage() {
        this.selectLabel = this.translationService.localizeValue('selectLabel', 'proxy', 'label');
    }

    ngAfterViewInit() {
        this.indicator.nativeElement.style = 'display:none';
    }

    ngOnDestroy(): void {
        this.urlSubscription.unsubscribe();
    }

    public renderAction(event: TextSelectEvent): void {
        if (event.hostRectangle) {
            this.hostRectangle = event.hostRectangle;
            this.selectedText = event.text;
            this.selectedElement = event.element;
            this.selectedElementName = event.elementName;
            this.indicator.nativeElement.style = `width: ${this.hostRectangle.width}; top: ${this.hostRectangle.top}px; left: ${this.hostRectangle.left}px`;

        } else {
            this.hostRectangle = null;
            this.selectedText = '';
            this.selectedElement = null;
            this.selectedElementName = null;
            this.indicator.nativeElement.style = 'display:none';
        }
    }

    public shareSelection(): void {
        window.parent.postMessage({ 'text': this.selectedText, 'element': this.selectedElement, 'elementName': this.selectedElementName }, environment.origin);

        document.getSelection().removeAllRanges();
        this.hostRectangle = null;
        this.selectedText = '';
    }
}
