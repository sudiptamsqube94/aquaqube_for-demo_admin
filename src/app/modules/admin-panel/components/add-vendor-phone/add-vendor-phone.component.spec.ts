import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorPhoneComponent } from './add-vendor-phone.component';

describe('AddVendorPhoneComponent', () => {
  let component: AddVendorPhoneComponent;
  let fixture: ComponentFixture<AddVendorPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
