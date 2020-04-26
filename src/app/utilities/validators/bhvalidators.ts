import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class BhValidators {

    static arrayLengthRequired(c: FormControl): any {
        return c.value.length > 0 ? null : {
            arrayLengthRequired: {
                valid: false
            }
        };
    }

    static identicalFields(group: FormGroup): any {
        let password = group.get('password').value;
        let confirmPassword = group.get('confirmPassword').value;
        return password === confirmPassword ? null : { valid: false };
    }
}

export class BhConfirmPasswordMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}