import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerPhoneComponent } from './add-customer-phone.component';

describe('AddCustomerPhoneComponent', () => {
  let component: AddCustomerPhoneComponent;
  let fixture: ComponentFixture<AddCustomerPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
