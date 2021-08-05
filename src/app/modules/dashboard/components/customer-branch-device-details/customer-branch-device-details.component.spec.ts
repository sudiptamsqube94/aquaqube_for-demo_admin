import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBranchDeviceDetailsComponent } from './customer-branch-device-details.component';

describe('CustomerBranchDeviceDetailsComponent', () => {
  let component: CustomerBranchDeviceDetailsComponent;
  let fixture: ComponentFixture<CustomerBranchDeviceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBranchDeviceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBranchDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
