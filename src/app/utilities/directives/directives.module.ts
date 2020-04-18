import { NgModule } from '@angular/core';
import { DragdropDirective } from './dragdrop/dragdrop.directive';
import { TextSelectDirective } from './textselect/textselect.directive';

@NgModule({
    declarations: [
        DragdropDirective,
        TextSelectDirective
    ],
    exports: [
        DragdropDirective,
        TextSelectDirective
    ]
})
export class DirectivesModule {
}