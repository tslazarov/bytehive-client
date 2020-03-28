import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeRequestsComponent } from './scraperequests.component';

describe('ScraperequestsComponent', () => {
    let component: ScrapeRequestsComponent;
    let fixture: ComponentFixture<ScrapeRequestsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScrapeRequestsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrapeRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
