import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bh-successmessage',
    templateUrl: './successmessage.component.html',
    styleUrls: ['./successmessage.component.css']
})
export class SuccessMessageComponent implements OnInit {

    @Input() message;
    @Input() width;

    constructor() { }

    ngOnInit() {
    }

}
