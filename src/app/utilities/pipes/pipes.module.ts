import { NgModule } from '@angular/core';
import { LocalizationPipe } from './localization.pipe';
import { LocalizedDatePipe } from './localized.date.pipe';

@NgModule({
    declarations: [
        LocalizationPipe,
        LocalizedDatePipe
    ],
    exports: [
        LocalizationPipe,
        LocalizedDatePipe
    ]
})
export class PipesModule {
}