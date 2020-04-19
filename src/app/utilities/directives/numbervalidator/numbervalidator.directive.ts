import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, Validators, ValidatorFn } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export const MIN_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidatorDirective),
    multi: true
};

export const MAX_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidatorDirective),
    multi: true
};

@Directive({
    selector: 'input[type=number][min]',
    providers: [MIN_VALIDATOR]
})
export class MinValidatorDirective implements Validator {

    @Input()
    set min(value: any) {
        this.validator = Validators.min(coerceNumberProperty(value));
        if (typeof this.onChange === 'function') {
            this.onChange();
        }
    };

    validator: ValidatorFn;
    onChange: () => void;

    validate(control: AbstractControl): ValidationErrors | null {
        return this.validator ? this.validator(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onChange = fn;
    }

}

@Directive({
    selector: 'input[type=number][max]',
    providers: [MAX_VALIDATOR]
})
export class MaxValidatorDirective implements Validator {

    @Input()
    set max(value: any) {
        this.validator = Validators.max(coerceNumberProperty(value));
        if (typeof this.onChange === 'function') {
            this.onChange();
        }
    };

    validator: ValidatorFn;

    onChange: () => void;

    validate(control: AbstractControl): ValidationErrors | null {
        return this.validator ? this.validator(control) : null;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onChange = fn;
    }
}
