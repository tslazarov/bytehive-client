import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { AccountService } from '../../services/account.service';
import { SigninUser } from '../../models/signinuser.model.';
import { Router } from '@angular/router';
import { AuthLocalService } from '../../services/auth.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
    // common
    showPassword: boolean;

    // subscriptions
    socialSigninSubscription: Subscription;

    signinFormGroup: FormGroup;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private authLocalService: AuthLocalService,
        private authService: AuthService) { }

    ngOnInit(): void {

        this.socialSigninSubscription = this.authService.authState.subscribe((user) => {
            console.log(user);
        });

        this.signinFormGroup = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngOnDestroy(): void {
        this.socialSigninSubscription.unsubscribe();
    }

    signin(): void {
        let user = new SigninUser();
        user.email = this.signinFormGroup.value.email;
        user.password = this.signinFormGroup.value.password;

        this.accountService.signin(user)
            .subscribe(result => {
                if (result) {
                    this.authLocalService.signin(result);
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

    signinGoogle() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signinFacebook() {

    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }

}
