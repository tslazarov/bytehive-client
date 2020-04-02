import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailComponent } from './usersdetail.component';

describe('UsersdetailComponent', () => {
    let component: UsersDetailComponent;
    let fixture: ComponentFixture<UsersDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
