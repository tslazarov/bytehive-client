import { MinValidatorDirective, MaxValidatorDirective } from './numbervalidator.directive';

describe('MinValidatorDirective', () => {
    it('should create an instance', () => {
        const directive = new MinValidatorDirective();
        expect(directive).toBeTruthy();
    });
});

describe('MaxValidatorDirective', () => {
    it('should create an instance', () => {
        const directive = new MaxValidatorDirective();
        expect(directive).toBeTruthy();
    });
});