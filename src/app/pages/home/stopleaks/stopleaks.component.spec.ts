import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopleaksComponent } from './stopleaks.component';

describe('StopleaksComponent', () => {
  let component: StopleaksComponent;
  let fixture: ComponentFixture<StopleaksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StopleaksComponent]
    });
    fixture = TestBed.createComponent(StopleaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
