import { Component, OnInit, OnDestroy, Renderer, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/utilities/communication.service';
import { AccountService } from '../../services/account.service';
import { AuthLocalService } from '../../services/utilities/auth.service';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ImageUploadDialog } from '../../utilities/dialogs/imageupload/imageupload.dialog';
import { ImageChange } from '../../models/imagechange.model';
import { NotifierService } from 'angular-notifier';
import { Constants } from '../../utilities/constants';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    @ViewChild('requestOption', { static: false }) requestOption: ElementRef;

    // common
    notifier: NotifierService;
    profile: any = {};
    lastAction: any;
    selectedAction: string;
    image: string;

    // subscriptions
    languageChangeSubscription: Subscription;

    pollenLabel: string;
    myRequestsLabel: string;
    myOrdersLabel: string;
    personalInformationLabel: string;
    securityLabel: string;
    rewardsLabel: string;
    preferencesLabel: string;
    signoutLabel: string;

    constructor(private renderer: Renderer,
        private router: Router,
        private dialog: MatDialog,
        private notifierService: NotifierService,
        private communicationService: CommunicationService,
        private translationService: TranslationService,
        private accountService: AccountService,
        private authLocalService: AuthLocalService,
        private authService: AuthService) {
        this.notifier = notifierService;
    }

    ngOnInit(): void {
        this.selectedAction = 'request';

        this.setLabelsMessages();

        this.fetchProfile();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });
    }

    ngAfterViewInit(): void {
        this.lastAction = this.requestOption.nativeElement;
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    fetchProfile() {
        this.accountService.getProfile().subscribe((result) => {
            this.profile = result;
            if (this.profile.image) {
                this.image = `${environment.apiBaseUrl}${Constants.ACCOUNT_SERVICE_IMAGE_ENDPOINT}/${this.profile.image}`;
            }
        }, (error) => {

        });
    }

    setLabelsMessages(): void {
        this.pollenLabel = this.translationService.localizeValue('pollenLabel', 'profile', 'label');
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

    profileChange() {
        this.fetchProfile();
    }

    changeImage() {
        let dialogRef = this.dialog.open(ImageUploadDialog, { width: '800px', minHeight: '450px', autoFocus: false, });

        dialogRef.afterClosed().subscribe((image) => {
            if (image) {
                let avatarChange = new ImageChange();
                avatarChange.imageBase64 = image;
                this.accountService.changeImage(avatarChange).subscribe((result) => {
                    this.notifier.notify('success', this.translationService.localizeValue('unlockRequestSuccessLabel', 'requests-profile', 'label'));

                    this.profileChange();
                }, (error) => {
                    this.notifier.notify('error', this.translationService.localizeValue('unlockRequestErrorLabel', 'requests-profile', 'label'));
                })
            }
        });
    }
}
