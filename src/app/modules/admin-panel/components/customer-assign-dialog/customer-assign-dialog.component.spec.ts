import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAssignDialogComponent } from './customer-assign-dialog.component';

describe('CustomerAssignDialogComponent', () => {
  let component: CustomerAssignDialogComponent;
  let fixture: ComponentFixture<CustomerAssignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAssignDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
