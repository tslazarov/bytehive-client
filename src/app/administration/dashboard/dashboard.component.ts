import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from 'saturn-datepicker';
import { StatisticsService } from '../../services/statistics.service';
import { Constants } from '../../utilities/constants';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';

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

    constructor(private router: Router,
        private statisticsService: StatisticsService) { }

    ngOnInit(): void {
        this.fetchSummary();
        this.fetchUsersSummary();
        this.fetchRequestsSummary();
    }

    fetchSummary() {
        this.statisticsService.getSummary()
            .subscribe((result) => {
                this.summary = result;
            });
    }

    fetchUsersSummary() {
        this.statisticsService.getUsersSummary()
            .subscribe((result) => {
                this.users = result;
            });
    }

    fetchRequestsSummary() {
        this.statisticsService.getRequestsSummary()
            .subscribe((result) => {
                this.requests = result;
            });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
