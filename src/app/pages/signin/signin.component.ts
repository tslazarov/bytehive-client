import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { AccountService } from '../../services/account.service';
import { SigninUser } from '../../models/signinuser.model.';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    signinFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService) { }

    ngOnInit(): void {

        this.signinFormGroup = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    signin() {
        let user = new SigninUser();
        user.email = this.signinFormGroup.value.email;
        user.password = this.signinFormGroup.value.password;

        this.accountService.signin(user)
            .subscribe(result => {
                console.log(result);
            }, err => {
                if (err.status == 500) {
                    console.log('error');
                }
            });
    }

}
