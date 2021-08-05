import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSnackberComponent } from './success-snackber.component';

describe('SuccessSnackberComponent', () => {
  let component: SuccessSnackberComponent;
  let fixture: ComponentFixture<SuccessSnackberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessSnackberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSnackberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
