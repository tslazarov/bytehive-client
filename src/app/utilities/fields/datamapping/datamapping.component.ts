import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { first } from 'rxjs/operators';
import { FieldMapping } from '../../../models/fieldmapping.model';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CommunicationService } from '../../../services/communication.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'bh-datamapping',
    templateUrl: './datamapping.component.html',
    styleUrls: ['./datamapping.component.css']
})
export class DatamappingComponent implements OnInit, OnDestroy {

    // common
    fieldMappings: FieldMapping[];

    // subscriptions
    languageChangeSubscription: any;

    // labels
    nameLabel: string;
    markupLabel: string;
    insertFieldNameLabel: string;
    insertFieldMarkupLabel: string;
    automaticLabel: string;
    visualLabel: string;
    codeLabel: string;
    manualLabel: string;


    constructor(private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private clientService: ClientService,
        private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit() {
        this.fieldMappings = [];
        let mapping = new FieldMapping(this.formBuilder);

        console.log(mapping.formGroup);
        this.fieldMappings.push(mapping);

        this.clientService.getPageMarkup('https://btvnovinite.bg/')
            .pipe(first())
            .subscribe((markup) => {
            });

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages() {
        this.nameLabel = this.translationService.localizeValue('nameLabel', 'datamapping', 'label');
        this.markupLabel = this.translationService.localizeValue('markupLabel', 'datamapping', 'label');
        this.insertFieldNameLabel = this.translationService.localizeValue('insertFieldNameLabel', 'datamapping', 'label');
        this.insertFieldMarkupLabel = this.translationService.localizeValue('insertFieldMarkupLabel', 'datamapping', 'label');
        this.automaticLabel = this.translationService.localizeValue('automaticLabel', 'datamapping', 'label');
        this.visualLabel = this.translationService.localizeValue('visualLabel', 'datamapping', 'label');
        this.codeLabel = this.translationService.localizeValue('codeLabel', 'datamapping', 'label');
        this.manualLabel = this.translationService.localizeValue('manualLabel', 'datamapping', 'label');
    }

    addMapping(): void {
        let fieldMapping = new FieldMapping(this.formBuilder);
        this.fieldMappings.push(fieldMapping);
    }

    removeMapping(id: string): void {
        let index = this.fieldMappings.map(fm => fm.id).indexOf(id);

        if (index > -1) {
            this.fieldMappings.splice(index, 1);
        }
    }

    automaticMapping(fieldMapping: FieldMapping) {

    }

    visualMapping(fieldMapping: FieldMapping) {

    }

    codeMapping(fieldMapping: FieldMapping) {

    }

    manualMapping(fieldMapping: FieldMapping) {

    }

    toggleEditMode(fieldMapping: FieldMapping, editable: boolean) {
        fieldMapping.editMode = editable;
    }
}
