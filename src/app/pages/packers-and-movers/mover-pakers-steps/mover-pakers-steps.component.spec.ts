import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverPakersStepsComponent } from './mover-pakers-steps.component';

describe('MoverPakersStepsComponent', () => {
  let component: MoverPakersStepsComponent;
  let fixture: ComponentFixture<MoverPakersStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoverPakersStepsComponent]
    });
    fixture = TestBed.createComponent(MoverPakersStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
