import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from './services/translation.service';
import { Constants } from './utilities/constants';
import { Subject } from 'rxjs';
import { CommunicationService } from './services/communication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // common
    currentLanguage: string;

    // labels
    homeLabel: string;
    hiveLabel: string;
    faqLabel: string;
    signinLabel: string;
    currentLanguageLabel: string;

    constructor(private router: Router,
        private translationService: TranslationService,
        private communicationService: CommunicationService) { }

    ngOnInit(): void {
        this.setLanguage();
        this.setLabelsMessages();
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
}
