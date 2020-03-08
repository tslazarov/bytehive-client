import { NgModule } from '@angular/core';
import { DragdropDirective } from './dragdrop/dragdrop.directive';

@NgModule({
    declarations: [
        DragdropDirective
    ],
    exports: [
        DragdropDirective
    ]
})
export class DirectivesModule {
}