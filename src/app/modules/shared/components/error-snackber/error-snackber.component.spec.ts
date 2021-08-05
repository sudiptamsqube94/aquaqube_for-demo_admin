import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSnackberComponent } from './error-snackber.component';

describe('ErrorSnackberComponent', () => {
  let component: ErrorSnackberComponent;
  let fixture: ComponentFixture<ErrorSnackberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorSnackberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSnackberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
