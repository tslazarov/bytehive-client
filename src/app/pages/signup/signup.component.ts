import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { BhValidators, BhConfirmPasswordMatcher } from '../../utilities/validators/bhvalidators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupFormGroup: FormGroup;

    confirmPasswordMatcher: BhConfirmPasswordMatcher;

    constructor(private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

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
        });
    }

    signup() {
    }
}
