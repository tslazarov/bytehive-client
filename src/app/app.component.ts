import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './services/utilities/translation.service';
import { Constants } from './utilities/constants';
import { Subject, Subscription } from 'rxjs';
import { CommunicationService } from './services/utilities/communication.service';
import { AuthLocalService } from './services/utilities/auth.service';
import { AccountService } from './services/account.service';
import { AuthService } from 'angularx-social-login';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    // common
    authenticated: boolean;
    currentLanguage: string;
    email: string;
    navigationAdministrationSegment: boolean;

    // subscriptions
    authenticationChangeSubscription: Subscription;
    languageChangeSubscription: Subscription;

    // labels
    homeLabel: string;
    hiveLabel: string;
    faqLabel: string;
    signinLabel: string;
    settingsLabel: string;
    signoutLabel: string;
    currentLanguageLabel: string;
    administrationLabel: string;
    dashboardLabel: string;
    usersLabel: string;
    requestsLabel: string;

    constructor(private router: Router,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private authLocalService: AuthLocalService,
        private authService: AuthService) { }

    ngOnInit(): void {

        this.authenticationChangeSubscription = this.communicationService.authenticationChangeEmitted.subscribe(() => {
            this.setCurrentUser();
        });

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLanguage();
            this.setLabelsMessages();
        });

        this.setCurrentUser();
        this.setLanguage();
        this.setLabelsMessages();
    }

    ngOnDestroy(): void {
        this.authenticationChangeSubscription.unsubscribe();
        this.languageChangeSubscription.unsubscribe();
    }

    setLanguage(): void {
        let languageKey = localStorage.getItem(Constants.LANGUAGE_KEY);
        this.currentLanguage = languageKey;
        this.currentLanguageLabel = languageKey == 'en' ? 'English' : 'Български';
    }

    setLabelsMessages(): void {
        this.homeLabel = this.translationService.localizeValue('homeLabel', 'navigation', 'label');
        this.hiveLabel = this.translationService.localizeValue('hiveLabel', 'navigation', 'label');
        this.faqLabel = this.translationService.localizeValue('faqLabel', 'navigation', 'label');
        this.signinLabel = this.translationService.localizeValue('signinLabel', 'navigation', 'label');
        this.settingsLabel = this.translationService.localizeValue('settingsLabel', 'navigation', 'label');
        this.signoutLabel = this.translationService.localizeValue('signoutLabel', 'navigation', 'label');
        this.administrationLabel = this.translationService.localizeValue('administrationLabel', 'navigation', 'label');
        this.dashboardLabel = this.translationService.localizeValue('dashboardLabel', 'navigation', 'label');
        this.usersLabel = this.translationService.localizeValue('usersLabel', 'navigation', 'label');
        this.requestsLabel = this.translationService.localizeValue('requestsLabel', 'navigation', 'label');
    }

    setCurrentUser(): void {
        let email = this.authLocalService.getClaim('email');
        let role = this.authLocalService.getClaim('role');

        this.setEmail(email);
        this.setNavigation(role);
    }

    setEmail(email) {
        if (email) {
            this.email = email;
            this.authenticated = true;
        }
        else {
            this.email = '';
            this.authenticated = false;
        }
    }

    setNavigation(role) {
        if (role == 'Administrator') {
            this.navigationAdministrationSegment = true;
        }
        else {
            this.navigationAdministrationSegment = false;
        }
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e: any): void {
        let element = document.querySelector('.top-navbar');
        if (window.pageYOffset > 0) {
            element.classList.add('top-navbar-inverse');
        } else {
            element.classList.remove('top-navbar-inverse');
        }
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }

    changeLanguage(language: string): void {
        localStorage.setItem(Constants.LANGUAGE_KEY, language);

        // update labels
        this.translationService.updateLanguage();
        this.communicationService.emitLanguageChange();
    }

    signout() {
        this.accountService.signout()
            .subscribe(result => {
                this.signoutClient();
            }, err => {
                this.signoutClient();
            });
    }

    signoutClient() {
        var provider = this.authLocalService.getClaim('provider');

        if (provider && provider != 'Default') {
            this.authService.signOut();
        }

        this.authLocalService.signout();
        this.router.navigate(['/']);
    }
}
