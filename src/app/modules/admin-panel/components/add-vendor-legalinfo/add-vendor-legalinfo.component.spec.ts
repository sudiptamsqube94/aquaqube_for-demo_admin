import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorLegalinfoComponent } from './add-vendor-legalinfo.component';

describe('AddVendorLegalinfoComponent', () => {
  let component: AddVendorLegalinfoComponent;
  let fixture: ComponentFixture<AddVendorLegalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorLegalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorLegalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
