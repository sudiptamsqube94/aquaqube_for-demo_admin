import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMonitorDetailsComponent } from './device-monitor-details.component';

describe('DeviceMonitorDetailsComponent', () => {
  let component: DeviceMonitorDetailsComponent;
  let fixture: ComponentFixture<DeviceMonitorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMonitorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMonitorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
