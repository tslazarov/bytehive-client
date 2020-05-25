import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { StatisticsService } from '../../services/statistics.service';
import { Constants } from '../../utilities/constants';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { ExportType } from '../../models/enums/exporttype.enum';
import { formatDate } from '@angular/common';

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
export class DashboardComponent implements OnInit {

    // common
    summary: any;
    users: any;
    requests: any;
    requestsChartData: any[];
    exportUsageChartData: any[];

    colorSchemeChart = { domain: ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#9C27B0', '#FF9800'] };
    colorSchemeBarChart = { domain: ['#FFEB3B'] };


    constructor(private router: Router,
        private statisticsService: StatisticsService) { }

    ngOnInit(): void {
        this.fetchSummary();
        this.fetchUsersSummary();
        this.fetchRequestsSummary();
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
        this.exportUsageChartData = [{ name: 'test', type: ExportType.Csv, value: 0 },
        { name: 'test1', type: ExportType.Json, value: 0 },
        { name: 'test2', type: ExportType.Xml, value: 0 },
        { name: 'test3', type: ExportType.Txt, value: 0 },
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

            let pointsDataEntry = { name: formatDate(normalizedDate, 'dd.MM', 'bg'), series: [] };

            this.requestsChartData.push(pointsDataEntry);
        }

        let daysPoints = {};

        for (const request of requests) {
            if (request.creationDate) {
                console.log(request.creationDate);
                let originalDate = new Date(request.creationDate);
                let normalizedDate = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate());

                if (daysPoints[formatDate(normalizedDate, 'dd.MM', 'bg')] >= 0) {
                    daysPoints[formatDate(normalizedDate, 'dd.MM', 'bg')] += 1;
                }
                else {
                    daysPoints[formatDate(normalizedDate, 'dd.MM', 'bg')] = 1;
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
                    let cartnerElement = { name: '', value: 0 };

                    cartnerElement.name = 'test';
                    cartnerElement.value = Math.round(pointValue);

                    point.series.push(cartnerElement);
                }
            }
        }

        this.requestsChartData.reverse();
    }

    yAxisTickFormatting(value) {
        console.log(value);
        return Math.round(value);
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
