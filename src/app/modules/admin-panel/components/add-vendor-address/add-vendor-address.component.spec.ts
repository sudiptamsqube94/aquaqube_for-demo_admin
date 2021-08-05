import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorAddressComponent } from './add-vendor-address.component';

describe('AddVendorAddressComponent', () => {
  let component: AddVendorAddressComponent;
  let fixture: ComponentFixture<AddVendorAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
