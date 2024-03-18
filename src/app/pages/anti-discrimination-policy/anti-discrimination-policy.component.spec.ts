import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiDiscriminationPolicyComponent } from './anti-discrimination-policy.component';

describe('AntiDiscriminationPolicyComponent', () => {
  let component: AntiDiscriminationPolicyComponent;
  let fixture: ComponentFixture<AntiDiscriminationPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntiDiscriminationPolicyComponent]
    });
    fixture = TestBed.createComponent(AntiDiscriminationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
