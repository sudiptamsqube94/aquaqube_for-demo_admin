import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorFormComponent } from './add-vendor-form.component';

describe('AddVendorFormComponent', () => {
  let component: AddVendorFormComponent;
  let fixture: ComponentFixture<AddVendorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
