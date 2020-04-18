import { NgModule } from '@angular/core';
import { LocalizationPipe } from './localization.pipe';
import { LocalizedDatePipe } from './localized.date.pipe';
import { EscapeUrlPipe } from './safe-url.pipe';
import { EscapeHtmlPipe } from './safe-html.pipe';

@NgModule({
    declarations: [
        LocalizationPipe,
        LocalizedDatePipe,
        EscapeUrlPipe,
        EscapeHtmlPipe
    ],
    exports: [
        LocalizationPipe,
        LocalizedDatePipe,
        EscapeUrlPipe,
        EscapeHtmlPipe
    ]
})
export class PipesModule {
}