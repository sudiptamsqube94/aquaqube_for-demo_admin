import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAssignFormComponent } from './customer-assign-form.component';

describe('CustomerAssignFormComponent', () => {
  let component: CustomerAssignFormComponent;
  let fixture: ComponentFixture<CustomerAssignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAssignFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAssignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
