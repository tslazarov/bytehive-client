import { NgModule } from '@angular/core';
import { LocalizationPipe } from './localization.pipe';
import { LocalizedDatePipe } from './localized.date.pipe';
import { EscapeUrlPipe } from './safe-url.pipe';
import { EscapeHtmlPipe } from './safe-html.pipe';
import { ScrapeStatusConvertionPipe } from './scrape-status.convertion.pipe';
import { ExportTypeConvertionPipe } from './export-type.convertion.pipe';
import { ScrapeTypeConvertionPipe } from './scrape-type.convertion.pipe';

@NgModule({
    declarations: [
        LocalizationPipe,
        LocalizedDatePipe,
        EscapeUrlPipe,
        EscapeHtmlPipe,
        ScrapeStatusConvertionPipe,
        ExportTypeConvertionPipe,
        ScrapeTypeConvertionPipe
    ],
    exports: [
        LocalizationPipe,
        LocalizedDatePipe,
        EscapeUrlPipe,
        EscapeHtmlPipe,
        ScrapeStatusConvertionPipe,
        ExportTypeConvertionPipe,
        ScrapeTypeConvertionPipe
    ]
})
export class PipesModule {
}