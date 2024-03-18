import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitebackComponent } from './biteback.component';

describe('BitebackComponent', () => {
  let component: BitebackComponent;
  let fixture: ComponentFixture<BitebackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BitebackComponent]
    });
    fixture = TestBed.createComponent(BitebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
