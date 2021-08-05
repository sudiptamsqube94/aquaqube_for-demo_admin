import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBranchDetailsComponent } from './customer-branch-details.component';

describe('CustomerBranchDetailsComponent', () => {
  let component: CustomerBranchDetailsComponent;
  let fixture: ComponentFixture<CustomerBranchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBranchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBranchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
