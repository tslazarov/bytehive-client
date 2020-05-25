import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { StatisticsService } from '../../services/statistics.service';
import { Constants } from '../../utilities/constants';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { ExportType } from '../../models/enums/exporttype.enum';
import { formatDate } from '@angular/common';
import { TranslationService } from '../../services/utilities/translation.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/utilities/communication.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: localStorage.getItem(Constants.LANGUAGE_KEY) },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
})
export class DashboardComponent implements OnInit, OnDestroy {

    // subscriptions
    languageChangeSubscription: Subscription;

    // common
    summary: any;
    users: any;
    requests: any;
    requestsChartData: any[];
    exportUsageChartData: any[];

    colorSchemeChart = { domain: ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#9C27B0', '#FF9800'] };
    colorSchemeBarChart = { domain: ['#FFEB3B'] };

    // labels
    usersLabel: string;
    requestsLabel: string;
    entriesCountLabel: string;
    earningsLabel: string;
    currencyLabel: string;
    requestsLast30DaysLabel: string;
    exportTypesLabel: string;
    last5UsersLabel: string;
    last5RequestsLabel: string;
    byLabel: string;
    viewAllLabel: string;

    constructor(private router: Router,
        private communicationService: CommunicationService,
        private statisticsService: StatisticsService,
        private translationService: TranslationService) { }

    ngOnInit(): void {
        this.fetchSummary();
        this.fetchUsersSummary();
        this.fetchRequestsSummary();

        this.setLabelsMessages();

        this.languageChangeSubscription = this.communicationService.languageChangeEmitted.subscribe(() => {
            this.setLabelsMessages();
        });
    }

    ngOnDestroy(): void {
        this.languageChangeSubscription.unsubscribe();
    }

    setLabelsMessages(): void {
        this.usersLabel = this.translationService.localizeValue('usersLabel', 'dashboard', 'label');
        this.requestsLabel = this.translationService.localizeValue('requestsLabel', 'dashboard', 'label');
        this.entriesCountLabel = this.translationService.localizeValue('entriesCountLabel', 'dashboard', 'label');
        this.earningsLabel = this.translationService.localizeValue('earningsLabel', 'dashboard', 'label');
        this.currencyLabel = this.translationService.localizeValue('currencyLabel', 'dashboard', 'label');
        this.requestsLast30DaysLabel = this.translationService.localizeValue('requestsLast30DaysLabel', 'dashboard', 'label');
        this.exportTypesLabel = this.translationService.localizeValue('exportTypesLabel', 'dashboard', 'label');
        this.last5UsersLabel = this.translationService.localizeValue('last5UsersLabel', 'dashboard', 'label');
        this.last5RequestsLabel = this.translationService.localizeValue('last5RequestsLabel', 'dashboard', 'label');
        this.byLabel = this.translationService.localizeValue('byLabel', 'dashboard', 'label');
        this.viewAllLabel = this.translationService.localizeValue('viewAllLabel', 'dashboard', 'label');
    }

    fetchSummary(): void {
        this.statisticsService.getSummary()
            .subscribe((result) => {
                this.summary = result;
            });
    }

    fetchUsersSummary(): void {
        this.statisticsService.getUsersSummary()
            .subscribe((result) => {
                this.users = result;
            });
    }

    fetchRequestsSummary(): void {
        this.statisticsService.getRequestsSummary()
            .subscribe((result) => {
                this.requests = result;
                this.bindExportUsageData(result);
                this.bindVerticalChart(result);
            });
    }

    bindExportUsageData(requests: any[]): void {
        this.exportUsageChartData = [{ name: 'CSV', type: ExportType.Csv, value: 0 },
        { name: 'JSON', type: ExportType.Json, value: 0 },
        { name: 'XML', type: ExportType.Xml, value: 0 },
        { name: 'TXT', type: ExportType.Txt, value: 0 },
        ];

        for (const request of requests) {
            let req = this.exportUsageChartData.find(n => n.type == request.exportType);

            if (req) {
                req.value += 1;
            }
        }
    }

    bindVerticalChart(requests: any[]) {

        this.requestsChartData = [];

        for (let i = 0; i < 30; i++) {
            let currentDate = new Date();
            let normalizedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            normalizedDate.setDate(normalizedDate.getDate() - i);

            let pointsDataEntry = { name: formatDate(normalizedDate, 'dd.MM', this.translationService.getLanguage()), series: [] };

            this.requestsChartData.push(pointsDataEntry);
        }

        let daysPoints = {};

        for (const request of requests) {
            if (request.creationDate) {
                let originalDate = new Date(request.creationDate);
                let normalizedDate = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate());

                if (daysPoints[formatDate(normalizedDate, 'dd.MM', this.translationService.getLanguage())] >= 0) {
                    daysPoints[formatDate(normalizedDate, 'dd.MM', this.translationService.getLanguage())] += 1;
                }
                else {
                    daysPoints[formatDate(normalizedDate, 'dd.MM', this.translationService.getLanguage())] = 1;
                }
            }
        }

        for (const pointKey in daysPoints) {
            if (daysPoints.hasOwnProperty(pointKey)) {
                let pointValue = daysPoints[pointKey];

                var point = this.requestsChartData.find(obj => {
                    return obj.name === pointKey
                });

                if (point && point.series) {
                    let requestsElement = { name: '', value: 0 };

                    requestsElement.name = 'DayChart';
                    requestsElement.value = Math.round(pointValue);

                    point.series.push(requestsElement);
                }
            }
        }

        this.requestsChartData.reverse();
    }

    yAxisTickFormatting(value) {
        return Math.round(value);
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
