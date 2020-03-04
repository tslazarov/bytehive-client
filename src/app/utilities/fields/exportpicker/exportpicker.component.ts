import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExportType } from '../../../models/enums/exporttype.enum';

@Component({
    selector: 'bh-exportpicker',
    templateUrl: './exportpicker.component.html',
    styleUrls: ['./exportpicker.component.css']
})
export class ExportpickerComponent implements OnInit {

    @Input() parentForm: FormGroup;

    // common
    selectedOption: number;

    // enums
    exportTypes = ExportType;

    constructor() { }

    ngOnInit() {
    }

    selectOption(option) {
        this.selectedOption = option;

        this.parentForm.patchValue({ exportType: this.selectedOption });
    }

    isOptionActive(option: number): boolean {
        return this.selectedOption === option;
    }
}
