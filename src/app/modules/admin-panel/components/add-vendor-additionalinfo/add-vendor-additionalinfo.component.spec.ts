import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorAdditionalinfoComponent } from './add-vendor-additionalinfo.component';

describe('AddVendorAdditionalinfoComponent', () => {
  let component: AddVendorAdditionalinfoComponent;
  let fixture: ComponentFixture<AddVendorAdditionalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorAdditionalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorAdditionalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
