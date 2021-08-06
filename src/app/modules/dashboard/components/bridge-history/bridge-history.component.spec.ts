import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeHistoryComponent } from './bridge-history.component';

describe('BridgeHistoryComponent', () => {
  let component: BridgeHistoryComponent;
  let fixture: ComponentFixture<BridgeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridgeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
