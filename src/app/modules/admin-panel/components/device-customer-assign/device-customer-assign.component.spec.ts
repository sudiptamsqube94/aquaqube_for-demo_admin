import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCustomerAssignComponent } from './device-customer-assign.component';

describe('DeviceCustomerAssignComponent', () => {
  let component: DeviceCustomerAssignComponent;
  let fixture: ComponentFixture<DeviceCustomerAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCustomerAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCustomerAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
