import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    summary: any;

    constructor(private statisticsService: StatisticsService) { }

    ngOnInit(): void {
        this.fetchSummary();
    }

    fetchSummary() {
        this.statisticsService.getSummary()
            .subscribe((result) => {
                this.summary = result;
            });
    }

}
