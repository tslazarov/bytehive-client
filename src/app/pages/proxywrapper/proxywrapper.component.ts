import { Component, OnInit, Input, ChangeDetectorRef, HostListener, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
    selector: 'bh-proxywrapper',
    templateUrl: './proxywrapper.component.html',
    styleUrls: ['./proxywrapper.component.css']
})
export class ProxyWrapperComponent implements OnInit {

    @Input() url: string;
    @Output() selectionChange = new EventEmitter<string>();

    constructor(private chgRef: ChangeDetectorRef) { }

    ngOnInit() {
    }

    @HostListener('window:message', ['$event'])
    onMessage(evt) {
        this.chgRef.detach();
        evt.preventDefault();

        if (evt.origin == environment.origin) {
            this.selectionChange.emit(evt.data);
        }
    }
}
