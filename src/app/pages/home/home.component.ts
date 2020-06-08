import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../../services/utilities/translation.service';
import { CommunicationService } from '../../services/utilities/communication.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    // subscriptions
    languageChangeSubscription: Subscription;

    // labels
    headerLabel: string;
    stepOneTitleLabel: string;
    stepOneDescriptionLabel: string;
    stepTwoTitleLabel: string;
    stepTwoDescriptionLabel: string;
    stepThreeTitleLabel: string;
    stepThreeDescriptionLabel: string;

    constructor(private communicationService: CommunicationService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages() {
        this.headerLabel = this.translationService.localizeValue('headerLabel', 'home', 'label');
        this.stepOneTitleLabel = this.translationService.localizeValue('stepOneTitleLabel', 'home', 'label');
        this.stepOneDescriptionLabel = this.translationService.localizeValue('stepOneDescriptionLabel', 'home', 'label');
        this.stepTwoTitleLabel = this.translationService.localizeValue('stepTwoTitleLabel', 'home', 'label');
        this.stepTwoDescriptionLabel = this.translationService.localizeValue('stepTwoDescriptionLabel', 'home', 'label');
        this.stepThreeTitleLabel = this.translationService.localizeValue('stepThreeTitleLabel', 'home', 'label');
        this.stepThreeDescriptionLabel = this.translationService.localizeValue('stepThreeDescriptionLabel', 'home', 'label');
    }

}
