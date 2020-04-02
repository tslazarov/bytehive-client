import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslationService } from '../../services/utilities/translation.service';

const localizableRangeLabel = (page: number, pageSize: number, length: number) => {
    const translationService = new TranslationService();
    var ofLabel = translationService.localizeValue('ofLabel', 'pagination', 'label');

    if (length == 0 || pageSize == 0) { return `0 ${ofLabel} ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${ofLabel} ${length}`;
}

export function getLocalizablePaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    const translationService = new TranslationService();

    paginatorIntl.itemsPerPageLabel = translationService.localizeValue('itemsPerPageLabel', 'pagination', 'label');
    paginatorIntl.firstPageLabel = translationService.localizeValue('firstPageLabel', 'pagination', 'label');
    paginatorIntl.nextPageLabel = translationService.localizeValue('nextPageLabel', 'pagination', 'label');
    paginatorIntl.previousPageLabel = translationService.localizeValue('previousPageLabel', 'pagination', 'label');
    paginatorIntl.lastPageLabel = translationService.localizeValue('lastPageLabel', 'pagination', 'label');
    paginatorIntl.getRangeLabel = localizableRangeLabel;

    return paginatorIntl;
}