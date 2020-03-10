import { FormControl } from '@angular/forms';

export class BhValidators {

    static arrayLengthRequired(c: FormControl): any {
        return c.value.length > 0 ? null : {
            arrayLengthRequired: {
                valid: false
            }
        };
    }
}