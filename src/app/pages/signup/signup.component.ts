import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { BhValidators, BhConfirmPasswordMatcher } from '../../utilities/validators/bhvalidators';
import { AccountService } from '../../services/account.service';
import { SignupUser } from '../../models/signupuser.model';
import { OccupationType } from '../../models/enums/occupationtype.enum';
import { Occupation } from '../../models/occupation.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    // forms
    signupFormGroup: FormGroup;

    // common
    occupations: Occupation[];

    confirmPasswordMatcher: BhConfirmPasswordMatcher;

    constructor(private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService) { }

    ngOnInit(): void {

        this.confirmPasswordMatcher = new BhConfirmPasswordMatcher();

        this.signupFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: this.formBuilder.group({
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: BhValidators.identicalFields }),
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            occupation: [''],
        });

        this.buildOccupationOptions();
    }

    buildOccupationOptions(): void {

        this.occupations = [];

        for (let occupationType in OccupationType) {
            if (isNaN(Number(occupationType))) {
                let labelName = occupationType.toLowerCase() + "Label";
                let occupation = new Occupation();
                occupation.value = OccupationType[occupationType];
                occupation.label = this.translationService.localizeValue(labelName, 'occupation', 'label');

                this.occupations.push(occupation);
            }
        }
    }

    signup(): void {
        let user = new SignupUser();
        user.email = this.signupFormGroup.value.email;
        user.password = this.signupFormGroup.controls['password'].value.password;
        user.confirmPassword = this.signupFormGroup.controls['password'].value.confirmPassword;
        user.firstName = this.signupFormGroup.value.firstName;
        user.lastName = this.signupFormGroup.value.lastName;
        user.occupation = this.signupFormGroup.value.occupation ? this.signupFormGroup.value.occupation : OccupationType.Other;
        user.defaultLanguage = this.translationService.getLanguage() == 'en' ? 0 : 1;

        this.accountService.signup(user)
            .subscribe(result => {
                // authenticate user
            }, err => {
                if (err.status == 400) {
                    console.log('show duplicate email');
                } else if (err.status == 500) {
                    console.log('error');
                }
            });
    }
}
