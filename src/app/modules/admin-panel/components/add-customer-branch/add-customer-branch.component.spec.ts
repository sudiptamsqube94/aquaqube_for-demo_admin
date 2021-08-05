import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerBranchComponent } from './add-customer-branch.component';

describe('AddCustomerBranchComponent', () => {
  let component: AddCustomerBranchComponent;
  let fixture: ComponentFixture<AddCustomerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
