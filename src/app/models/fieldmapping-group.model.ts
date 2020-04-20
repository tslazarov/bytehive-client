import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Guid } from '../utilities/helpers/guid';

export class FieldMappingGroup {
    formGroup: FormGroup;
    id: string;
    editMode: boolean;
    constructor(private formBuilder: FormBuilder) {
        this.id = Guid.new();
        this.formGroup = this.formBuilder.group({
            fieldName: ['', Validators.required],
            fieldMarkup: ['', Validators.required]
        });
    }
}