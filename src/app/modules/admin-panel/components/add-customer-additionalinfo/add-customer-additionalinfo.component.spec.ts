import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerAdditionalinfoComponent } from './add-customer-additionalinfo.component';

describe('AddCustomerAdditionalinfoComponent', () => {
  let component: AddCustomerAdditionalinfoComponent;
  let fixture: ComponentFixture<AddCustomerAdditionalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerAdditionalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerAdditionalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
