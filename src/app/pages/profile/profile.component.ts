import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/utilities/communication.service';
import { AccountService } from '../../services/account.service';
import { AuthLocalService } from '../../services/utilities/auth.service';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    // common
    lastAction: any;
    selectedAction: string;

    // subscriptions
    languageChangeSubscription: Subscription;

    myRequestsLabel: string;
    myOrdersLabel: string;
    personalInformationLabel: string;
    securityLabel: string;
    rewardsLabel: string;
    preferencesLabel: string;
    signoutLabel: string;

    constructor(private renderer: Renderer,
        private router: Router,
        private communicationService: CommunicationService,
        private translationService: TranslationService,
        private accountService: AccountService,
        private authLocalService: AuthLocalService,
        private authService: AuthService) { }

    ngOnInit(): void {
        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.myRequestsLabel = this.translationService.localizeValue('myRequestsLabel', 'profile', 'label');
        this.myOrdersLabel = this.translationService.localizeValue('myOrdersLabel', 'profile', 'label');
        this.personalInformationLabel = this.translationService.localizeValue('personalInformationLabel', 'profile', 'label');
        this.securityLabel = this.translationService.localizeValue('securityLabel', 'profile', 'label');
        this.rewardsLabel = this.translationService.localizeValue('rewardsLabel', 'profile', 'label');
        this.preferencesLabel = this.translationService.localizeValue('preferencesLabel', 'profile', 'label');
        this.signoutLabel = this.translationService.localizeValue('signoutLabel', 'profile', 'label');
    }

    open(event, action): void {
        event.stopPropagation();
        if (this.lastAction && this.lastAction != event.currentTarget) {
            this.lastAction.classList.remove('selected');
        }
        this.lastAction = event.currentTarget;
        event.currentTarget.classList.add('selected');

        this.selectedAction = action;
    }

    signout(): void {
        this.accountService.signout()
            .subscribe(result => {
                this.signoutClient();
            }, err => {
                this.signoutClient();
            });
    }

    signoutClient(): void {
        var provider = this.authLocalService.getClaim('provider');

        if (provider && provider != 'Default') {
            this.authService.signOut();
        }

        this.authLocalService.signout();
        this.router.navigate(['/']);
    }

}
