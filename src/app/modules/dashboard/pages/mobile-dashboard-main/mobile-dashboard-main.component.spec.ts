import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDashboardMainComponent } from './mobile-dashboard-main.component';

describe('MobileDashboardMainComponent', () => {
  let component: MobileDashboardMainComponent;
  let fixture: ComponentFixture<MobileDashboardMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDashboardMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
