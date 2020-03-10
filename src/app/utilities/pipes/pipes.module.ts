import { NgModule } from '@angular/core';
import { LocalizationPipe } from './localization.pipe';

@NgModule({
    declarations: [
        LocalizationPipe
    ],
    exports: [
        LocalizationPipe
    ]
})
export class PipesModule {
}