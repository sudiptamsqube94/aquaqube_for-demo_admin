import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVendorCustomerComponent } from './show-vendor-customer.component';

describe('ShowVendorCustomerComponent', () => {
  let component: ShowVendorCustomerComponent;
  let fixture: ComponentFixture<ShowVendorCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVendorCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVendorCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
