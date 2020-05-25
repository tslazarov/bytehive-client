import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { StatisticsService } from '../../services/statistics.service';
import { Constants } from '../../utilities/constants';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { ExportType } from '../../models/enums/exporttype.enum';

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
    exportUsageChartData: any[];

    colorSchemeChart = { domain: ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#9C27B0', '#FF9800'] };


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
                console.log(this.exportUsageChartData);
            });
    }

    bindExportUsageData(requests): void {
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

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
