import { NgModule } from '@angular/core';
import { DragdropDirective } from './dragdrop/dragdrop.directive';
import { TextSelectDirective } from './textselect/textselect.directive';
import { MinValidatorDirective, MaxValidatorDirective } from './numbervalidator/numbervalidator.directive';

@NgModule({
    declarations: [
        DragdropDirective,
        TextSelectDirective,
        MinValidatorDirective,
        MaxValidatorDirective
    ],
    exports: [
        DragdropDirective,
        TextSelectDirective,
        MinValidatorDirective,
        MaxValidatorDirective
    ]
})
export class DirectivesModule {
}