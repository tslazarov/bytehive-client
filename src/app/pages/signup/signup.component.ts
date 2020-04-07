import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { BhValidators, BhConfirmPasswordMatcher } from '../../utilities/validators/bhvalidators';
import { AccountService } from '../../services/account.service';
import { SignupUser } from '../../models/signupuser.model';
import { OccupationType } from '../../models/enums/occupationtype.enum';
import { Occupation } from '../../models/occupation.model';
import { Subscription } from 'rxjs';
import { AuthLocalService } from '../../services/utilities/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";

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
    notifier: NotifierService;
    confirmPasswordMatcher: BhConfirmPasswordMatcher;
    showPassword: boolean;
    showConfirmPassword: boolean;
    showLoading: boolean;

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    emailLabel: string;
    emailRequiredErrorLabel: string;
    emailPatternErrorLabel: string;
    passwordLabel: string;
    passwordRequiredErrorLabel: string;
    passwordLengthErrorLabel: string;
    confirmPasswordLabel: string;
    confirmPasswordMatchErrorLabel: string;
    firstNameLabel: string;
    firstNameRequiredErrorLabel: string;
    lastNameLabel: string;
    lastNameRequiredErrorLabel: string;
    occupationLabel: string;
    signupLabel: string;

    constructor(private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private authLocalService: AuthLocalService,
        notifier: NotifierService,
        private router: Router) {
        this.notifier = notifier;
    }

    ngOnInit(): void {

        this.confirmPasswordMatcher = new BhConfirmPasswordMatcher();

        this.signupFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: BhValidators.identicalFields }),
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            occupation: [''],
        });

        this.setLabelsMessages();
        this.buildOccupationOptions();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(e => {
            this.setLabelsMessages();
            this.buildOccupationOptions();
        });

        this.notifier.notify("success", "You are awesome! I mean it!");
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.emailLabel = this.translationService.localizeValue('emailLabel', 'signup', 'label');
        this.emailRequiredErrorLabel = this.translationService.localizeValue('emailRequiredErrorLabel', 'signup', 'label');
        this.emailPatternErrorLabel = this.translationService.localizeValue('emailPatternErrorLabel', 'signup', 'label');
        this.passwordLabel = this.translationService.localizeValue('passwordLabel', 'signup', 'label');
        this.passwordRequiredErrorLabel = this.translationService.localizeValue('passwordRequiredErrorLabel', 'signup', 'label');
        this.passwordLengthErrorLabel = this.translationService.localizeValue('passwordLengthErrorLabel', 'signup', 'label');
        this.confirmPasswordLabel = this.translationService.localizeValue('confirmPasswordLabel', 'signup', 'label');
        this.confirmPasswordMatchErrorLabel = this.translationService.localizeValue('confirmPasswordMatchErrorLabel', 'signup', 'label');
        this.firstNameLabel = this.translationService.localizeValue('firstNameLabel', 'signup', 'label');
        this.firstNameRequiredErrorLabel = this.translationService.localizeValue('firstNameRequiredErrorLabel', 'signup', 'label');
        this.lastNameLabel = this.translationService.localizeValue('lastNameLabel', 'signup', 'label');
        this.lastNameRequiredErrorLabel = this.translationService.localizeValue('lastNameRequiredErrorLabel', 'signup', 'label');
        this.occupationLabel = this.translationService.localizeValue('occupationLabel', 'signup', 'label');
        this.signupLabel = this.translationService.localizeValue('signupLabel', 'signup', 'label');
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

        this.showLoading = true;

        this.accountService.signup(user)
            .subscribe(result => {
                this.showLoading = false;
                if (result) {
                    this.authLocalService.signin(result);
                    let callback = localStorage.getItem('bh_callback');
                    // TODO: Set preferred language

                    this.communicationService.emitAuthenticationChange();

                    if (callback) {
                        this.router.navigate([callback]);
                        localStorage.removeItem('bh_callback');
                    }
                    else {
                        this.router.navigate(['/']);
                    }
                }
            }, err => {
                this.showLoading = false;
                if (err.status == 400) {
                    console.log('show duplicate email');
                } else if (err.status == 500) {
                    console.log('error');
                }
            });
    }
}
