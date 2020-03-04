import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportpickerComponent } from './exportpicker.component';

describe('ExportpickerComponent', () => {
    let component: ExportpickerComponent;
    let fixture: ComponentFixture<ExportpickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExportpickerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExportpickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
