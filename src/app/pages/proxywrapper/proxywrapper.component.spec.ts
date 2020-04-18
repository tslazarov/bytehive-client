import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyWrapperComponent } from './proxywrapper.component';

describe('ProxywrapperComponent', () => {
    let component: ProxyWrapperComponent;
    let fixture: ComponentFixture<ProxyWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProxyWrapperComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProxyWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
