import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { AccountService } from '../../services/account.service';
import { SigninUser } from '../../models/signinuser.model.';
import { Router } from '@angular/router';
import { AuthLocalService } from '../../services/utilities/auth.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { SigninExternalUser } from '../../models/signinexternaluser.model';
import { StringHelper } from '../../utilities/helpers/String';
import { OccupationType } from '../../models/enums/occupationtype.enum';
import { Constants } from '../../utilities/constants';
import { MatDialog } from '@angular/material';
import { ResetPasswordData, ResetPasswordDialog } from '../../utilities/dialogs/resetpassword/resetpassword.dialog';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
    // common
    notifier: NotifierService;
    showPassword: boolean;
    showLoading: boolean;
    showErrorMessage: boolean;

    // subscriptions
    socialSigninSubscription: Subscription;
    languageChangeSubscription: Subscription;

    signinFormGroup: FormGroup;

    // labels:
    signinLabel: string;
    emailLabel: string;
    emailRequiredErrorLabel: string;
    passwordLabel: string;
    passwordRequiredErrorLabel: string;
    forgotPasswordLabel: string;
    signinFacebookLabel: string;
    signinGoogleLabel: string;
    noAccountLabel: string;
    errorMessageLabel: string;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private authLocalService: AuthLocalService,
        private authService: AuthService,
        private notifierService: NotifierService) {
        this.notifier = notifierService;
    }

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

    setLabelsMessages(): void {
        this.signinLabel = this.translationService.localizeValue('signinLabel', 'signin', 'label');
        this.emailLabel = this.translationService.localizeValue('emailLabel', 'signin', 'label');
        this.emailRequiredErrorLabel = this.translationService.localizeValue('emailRequiredErrorLabel', 'signin', 'label');
        this.passwordLabel = this.translationService.localizeValue('passwordLabel', 'signin', 'label');
        this.passwordRequiredErrorLabel = this.translationService.localizeValue('passwordRequiredErrorLabel', 'signin', 'label');
        this.forgotPasswordLabel = this.translationService.localizeValue('forgotPasswordLabel', 'signin', 'label');
        this.signinFacebookLabel = this.translationService.localizeValue('signinFacebookLabel', 'signin', 'label');
        this.signinGoogleLabel = this.translationService.localizeValue('signinGoogleLabel', 'signin', 'label');
        this.noAccountLabel = this.translationService.localizeValue('noAccountLabel', 'signin', 'label');
    }

    setLanguage() {
        let defaultLanguage = this.authLocalService.getClaim('language');
        if (defaultLanguage) {
            let language = defaultLanguage == 'English' ? 'en' : 'bg';
            localStorage.setItem(Constants.LANGUAGE_KEY, language);
            this.translationService.updateLanguage();

            this.communicationService.emitLanguageChange();
        }
    }

    signin(): void {
        let user = new SigninUser();
        user.email = this.signinFormGroup.value.email;
        user.password = this.signinFormGroup.value.password;

        this.showLoading = true;

        this.accountService.signin(user)
            .subscribe(result => {
                this.showLoading = false;
                if (result) {
                    this.authLocalService.signin(result);
                    this.communicationService.emitAuthenticationChange();

                    this.setLanguage();

                    let callback = localStorage.getItem('bh_callback');

                    if (callback) {
                        this.router.navigate([callback]);
                        localStorage.removeItem('bh_callback');
                    }
                    else {
                        this.router.navigate(['/']);
                    }
                }
            }, (error) => {
                this.showErrorMessage = true;
                this.showLoading = false;

                if (error.status == 400) {
                    this.errorMessageLabel = this.translationService.localizeValue('invalidCredentialsLabel', 'signin', 'label');
                } else {
                    this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'signin', 'label');
                }

                setTimeout(() => this.showErrorMessage = false, 3000);
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

        this.showLoading = true;

        this.accountService.signinExternal(signinExternalUser)
            .subscribe(result => {
                this.showLoading = false;
                if (result) {
                    this.authLocalService.signin(result);
                    this.communicationService.emitAuthenticationChange();

                    this.setLanguage();

                    let callback = localStorage.getItem('bh_callback');

                    if (callback) {
                        this.router.navigate([callback]);
                        localStorage.removeItem('bh_callback');
                    }
                    else {
                        this.router.navigate(['/']);
                    }
                }
            }, (error) => {
                this.showLoading = false;
                this.showErrorMessage = true;
                this.errorMessageLabel = this.translationService.localizeValue('serverErrorLabel', 'signin', 'label');

                setTimeout(() => this.showErrorMessage = false, 3000);
            });
    }

    resetpassword(): void {
        let resetCodeVerification = new ResetPasswordData();
        let dialogRef = this.dialog.open(ResetPasswordDialog, { width: '450px', minHeight: '100px', autoFocus: false, data: { resetCodeVerification } });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.notifier.notify("success", this.translationService.localizeValue('resetPasswordSuccessLabel', 'signin', 'label'));
            }
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }

}
