import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorCustomerComponent } from './view-vendor-customer.component';

describe('ViewVendorCustomerComponent', () => {
  let component: ViewVendorCustomerComponent;
  let fixture: ComponentFixture<ViewVendorCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVendorCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVendorCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
