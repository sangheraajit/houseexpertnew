import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRequestComponent } from './home-request.component';

describe('HomeRequestComponent', () => {
  let component: HomeRequestComponent;
  let fixture: ComponentFixture<HomeRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeRequestComponent]
    });
    fixture = TestBed.createComponent(HomeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
