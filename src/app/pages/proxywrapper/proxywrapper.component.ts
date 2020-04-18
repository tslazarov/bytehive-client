import { Component, OnInit, Input, ChangeDetectorRef, HostListener, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
    selector: 'bh-proxywrapper',
    templateUrl: './proxywrapper.component.html',
    styleUrls: ['./proxywrapper.component.css']
})
export class ProxyWrapperComponent {

    @Input() url: string;
    @Output() selectionChange = new EventEmitter<any>();

    constructor(private chgRef: ChangeDetectorRef) { }

    @HostListener('window:message', ['$event'])
    onMessage(evt) {
        evt.preventDefault();
        this.chgRef.detach();
        if (evt.origin == environment.origin) {
            if (evt.data['text']) {
                this.selectionChange.emit(evt.data);
            };
        }
    }
}
