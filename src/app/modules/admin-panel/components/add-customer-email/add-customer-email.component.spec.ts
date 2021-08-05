import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerEmailComponent } from './add-customer-email.component';

describe('AddCustomerEmailComponent', () => {
  let component: AddCustomerEmailComponent;
  let fixture: ComponentFixture<AddCustomerEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
