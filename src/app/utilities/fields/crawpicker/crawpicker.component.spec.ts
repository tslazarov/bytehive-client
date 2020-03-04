import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawpickerComponent } from './crawpicker.component';

describe('CrawpickerComponent', () => {
    let component: CrawpickerComponent;
    let fixture: ComponentFixture<CrawpickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CrawpickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrawpickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
