import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedToPayComponent } from './failed-to-pay.component';

describe('FailedToPayComponent', () => {
  let component: FailedToPayComponent;
  let fixture: ComponentFixture<FailedToPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailedToPayComponent]
    });
    fixture = TestBed.createComponent(FailedToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
