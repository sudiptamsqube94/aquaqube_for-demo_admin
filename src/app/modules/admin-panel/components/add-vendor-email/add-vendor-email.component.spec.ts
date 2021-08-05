import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorEmailComponent } from './add-vendor-email.component';

describe('AddVendorEmailComponent', () => {
  let component: AddVendorEmailComponent;
  let fixture: ComponentFixture<AddVendorEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
