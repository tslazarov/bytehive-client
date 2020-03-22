import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { AccountService } from '../../services/account.service';
import { SigninUser } from '../../models/signinuser.model.';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    signinFormGroup: FormGroup;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private authService: AuthService) { }

    ngOnInit(): void {

        this.signinFormGroup = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    signin() {
        let user = new SigninUser();
        user.email = this.signinFormGroup.value.email;
        user.password = this.signinFormGroup.value.password;

        this.accountService.signin(user)
            .subscribe(result => {
                if (result) {
                    this.authService.signin(result);
                    let callback = localStorage.getItem('bh_callback');

                    this.communicationService.emitAuthenticationChange();

                    if (callback) {
                        this.router.navigate([callback]);
                        localStorage.removeItem('bh_callback');
                    }
                    else {
                        this.router.navigate(['/']);
                    }
                }
                console.log(result);
            }, err => {
                if (err.status == 500) {
                    console.log('error');
                }
            });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }

}
