import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './services/translation.service';
import { Constants } from './utilities/constants';
import { Subject } from 'rxjs';
import { CommunicationService } from './services/communication.service';
import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';

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

    // subscriptions
    authenticationChangeSubscription: any;

    // labels
    homeLabel: string;
    hiveLabel: string;
    faqLabel: string;
    signinLabel: string;
    settingsLabel: string;
    signoutLabel: string;
    currentLanguageLabel: string;

    constructor(private router: Router,
        private translationService: TranslationService,
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private authService: AuthService) { }

    ngOnInit(): void {

        this.authenticationChangeSubscription = this.communicationService.authenticationChangeEmitted.subscribe(() => {
            this.setCurrentUser();
        });

        this.setCurrentUser();
        this.setLanguage();
        this.setLabelsMessages();
    }

    ngOnDestroy(): void {
        this.authenticationChangeSubscription.unsubscribe();
    }

    setLanguage(): void {
        let languageKey = localStorage.getItem(Constants.LANGUAGE_KEY);

        this.currentLanguageLabel = languageKey == 'en' ? 'English' : 'Български';
    }

    setLabelsMessages(): void {
        this.homeLabel = this.translationService.localizeValue('homeLabel', 'navigation', 'label');
        this.hiveLabel = this.translationService.localizeValue('hiveLabel', 'navigation', 'label');
        this.faqLabel = this.translationService.localizeValue('faqLabel', 'navigation', 'label');
        this.signinLabel = this.translationService.localizeValue('signinLabel', 'navigation', 'label');
        this.settingsLabel = this.translationService.localizeValue('settingsLabel', 'navigation', 'label');
        this.signoutLabel = this.translationService.localizeValue('signoutLabel', 'navigation', 'label');
    }

    setCurrentUser(): void {
        let email = this.authService.getEmail();

        if (email) {
            this.email = email;
            this.authenticated = true;
        }
        else {
            this.email = '';
            this.authenticated = false;
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
        let languageKey = localStorage.setItem(Constants.LANGUAGE_KEY, language);

        // update labels
        this.translationService.updateLanguage();
        this.setLabelsMessages();
        this.communicationService.emitLanguageChange();


        // update dropdown
        this.currentLanguage = language;
        this.currentLanguageLabel = language == 'en' ? 'English' : 'Български';
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
        this.authService.signout();
        this.communicationService.emitAuthenticationChange();
        this.router.navigate(['/']);
    }
}
