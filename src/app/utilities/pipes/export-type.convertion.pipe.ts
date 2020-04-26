import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';
import { ExportType } from '../../models/enums/exporttype.enum';

@Pipe({ name: 'exporttypeconvert' })
export class ExportTypeConvertionPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {
    }

    transform(value: number, triggerUpdate: boolean): string {
        switch (value) {
            case ExportType.Json:
                return this.translationService.localizeValue('jsonFormatLabel', 'export-type', 'label');
            case ExportType.Xml:
                return this.translationService.localizeValue('xmlFormatLabel', 'export-type', 'label');
            case ExportType.Csv:
                return this.translationService.localizeValue('csvFormatLabel', 'export-type', 'label');
            case ExportType.Txt:
                return this.translationService.localizeValue('txtFormatLabel', 'export-type', 'label');
        }
    }
}