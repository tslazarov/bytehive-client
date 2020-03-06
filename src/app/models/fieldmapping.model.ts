import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class FieldMapping {

    formGroup: FormGroup;
    id: string;
    editMode: boolean;

    constructor(private formBuilder: FormBuilder) {
        this.id = 'test';

        this.formGroup = this.formBuilder.group({
            fieldName: ['', Validators.required],
            fieldMarkup: ['', Validators.required]
        });
    }
}