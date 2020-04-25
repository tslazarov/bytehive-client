import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { TranslationService } from '../../../services/utilities/translation.service';
import { CommunicationService } from '../../../services/utilities/communication.service';
import { OccupationType } from '../../../models/enums/occupationtype.enum';
import { Occupation } from '../../../models/occupation.model';
import { ChangeInformation } from '../../../models/changeinformation.model';

@Component({
    selector: 'bh-profile-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

    @Output() profileChange = new EventEmitter<any>();

    // common
    occupations: any[];
    profileInformationFormGroup: FormGroup;
    showLoading: boolean;
    showErrorMessage: boolean;
    showSuccessMessage: boolean;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    informationLabel: string;
    firstNameLabel: string;
    firstNameRequiredErrorLabel: string;
    lastNameLabel: string;
    lastNameRequiredErrorLabel: string;
    occupationLabel: string;
    saveLabel: string;
    errorMessageLabel: string;
    successMessageLabel: string;

    constructor(private formBuilder: FormBuilder,
        private accountService: AccountService,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.profileInformationFormGroup = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            occupation: ['', [Validators.required]],
        });

        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
            this.buildOccupationOptions();
        });

        this.accountService.getProfile().subscribe((result) => {
            if (result) {
                this.profileInformationFormGroup.controls['firstName'].setValue(result.firstName);
                this.profileInformationFormGroup.controls['lastName'].setValue(result.lastName);
                this.profileInformationFormGroup.controls['occupation'].setValue(result.occupation);
            }
        })

        this.buildOccupationOptions();
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    buildOccupationOptions(): void {
        this.occupations = [];

        for (let occupationType in OccupationType) {
            if (isNaN(Number(occupationType))) {
                let labelName = occupationType.toLowerCase() + "Label";
                let occupation = new Occupation();
                occupation.value = OccupationType[occupationType];
                occupation.name = this.translationService.localizeValue(labelName, 'occupation', 'label');

                this.occupations.push(occupation);
            }
        }
    }

    setLabelsMessages() {
        this.informationLabel = this.translationService.localizeValue('informationLabel', 'information-profile', 'label');
        this.firstNameLabel = this.translationService.localizeValue('firstNameLabel', 'information-profile', 'label');
        this.firstNameRequiredErrorLabel = this.translationService.localizeValue('firstNameRequiredErrorLabel', 'information-profile', 'label');
        this.lastNameLabel = this.translationService.localizeValue('lastNameLabel', 'information-profile', 'label');
        this.lastNameRequiredErrorLabel = this.translationService.localizeValue('lastNameRequiredErrorLabel', 'information-profile', 'label');
        this.occupationLabel = this.translationService.localizeValue('occupationLabel', 'information-profile', 'label');
        this.saveLabel = this.translationService.localizeValue('saveLabel', 'information-profile', 'label');
    }

    changeProfileInformation() {
        let changeInformation = new ChangeInformation();
        changeInformation.firstName = this.profileInformationFormGroup.controls['firstName'].value;
        changeInformation.lastName = this.profileInformationFormGroup.controls['lastName'].value;
        changeInformation.occupation = this.profileInformationFormGroup.controls['occupation'].value;

        this.showLoading = true;

        this.accountService.changeInformation(changeInformation).subscribe(result => {
            this.showLoading = false;
            if (result) {
                this.profileChange.emit();
                this.successMessageLabel = this.translationService.localizeValue('informationChangedLabel', 'information-profile', 'label');
                this.showSuccessMessage = true;
                setTimeout(() => this.showSuccessMessage = false, 3000);
            }
        }, (error) => {
            this.showErrorMessage = true;
            this.showLoading = false;

            if (error.status == 400) {
                this.errorMessageLabel = this.translationService.localizeValue('informationNotChangedLabel', 'information-profile', 'label');
            } else {
                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'information-profile', 'label');
            }

            setTimeout(() => this.showErrorMessage = false, 3000);
        });
    }
}
