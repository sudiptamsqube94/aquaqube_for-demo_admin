import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerLegalinfoComponent } from './add-customer-legalinfo.component';

describe('AddCustomerLegalinfoComponent', () => {
  let component: AddCustomerLegalinfoComponent;
  let fixture: ComponentFixture<AddCustomerLegalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerLegalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerLegalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
