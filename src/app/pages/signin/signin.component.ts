import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { CommunicationService } from '../../services/communication.service';
import { AccountService } from '../../services/account.service';
import { SigninUser } from '../../models/signinuser.model.';
import { Router } from '@angular/router';
import { AuthLocalService } from '../../services/auth.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Observable, Subscription } from 'rxjs';
import { SigninExternalUser } from '../../models/signinexternaluser.model';
import { StringHelper } from '../../utilities/helpers/String';
import { OccupationType } from '../../models/enums/occupationtype.enum';
import { Constants } from '../../utilities/constants';

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
    languageChangeSubscription: Subscription;

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
            let isExternalCallback = localStorage.getItem('bh_external_callback');

            if (user && isExternalCallback) {
                localStorage.removeItem('bh_external_callback');
                this.signinExternal(user);
            }
        });

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });

        this.signinFormGroup = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngOnDestroy(): void {
        this.socialSigninSubscription.unsubscribe();
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages() {
        console.log('SET lbl');
    }

    signin(): void {
        let user = new SigninUser();
        user.email = this.signinFormGroup.value.email;
        user.password = this.signinFormGroup.value.password;
        //TODO: Send ip address

        this.accountService.signin(user)
            .subscribe(result => {
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
                if (err.status == 500) {
                    console.log('error');
                }
            });
    }

    signinGoogle() {
        localStorage.setItem('bh_external_callback', 'true');
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signinFacebook() {
        localStorage.setItem('bh_external_callback', 'true');
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    signinExternal(user: SocialUser): void {
        var signinExternalUser = new SigninExternalUser();
        signinExternalUser.email = user.email;
        signinExternalUser.firstName = user.firstName;
        signinExternalUser.lastName = user.lastName;
        signinExternalUser.provider = StringHelper.capitalize(user.provider);
        signinExternalUser.token = user.authToken;
        signinExternalUser.defaultLanguage = this.translationService.getLanguage() == 'en' ? 0 : 1;
        signinExternalUser.occupation = OccupationType.Other;
        //TODO: Send ip address

        this.accountService.signinExternal(signinExternalUser)
            .subscribe(result => {
                if (result) {
                    this.authLocalService.signin(result);
                    let callback = localStorage.getItem('bh_callback');

                    let defaultLanguage = this.authLocalService.getClaim('language');
                    if (defaultLanguage) {
                        let language = defaultLanguage == 'English' ? 'en' : 'bg';
                        localStorage.setItem(Constants.LANGUAGE_KEY, language);
                        this.translationService.updateLanguage();

                        this.communicationService.emitLanguageChange();
                    }

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
