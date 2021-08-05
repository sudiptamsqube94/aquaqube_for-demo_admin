import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMainComponent } from './vendor-main.component';

describe('VendorMainComponent', () => {
  let component: VendorMainComponent;
  let fixture: ComponentFixture<VendorMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
