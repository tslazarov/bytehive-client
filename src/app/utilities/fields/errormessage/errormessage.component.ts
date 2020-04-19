import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bh-errormessage',
    templateUrl: './errormessage.component.html',
    styleUrls: ['./errormessage.component.css']
})
export class ErrorMessageComponent implements OnInit {

    @Input() message;
    @Input() width;

    constructor() { }

    ngOnInit() {
    }

}
