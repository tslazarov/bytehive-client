import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapepickerComponent } from './scrapepicker.component';

describe('ScrapepickerComponent', () => {
    let component: ScrapepickerComponent;
    let fixture: ComponentFixture<ScrapepickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScrapepickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrapepickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
