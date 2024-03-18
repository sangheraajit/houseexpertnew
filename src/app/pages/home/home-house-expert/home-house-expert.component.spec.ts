import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHouseExpertComponent } from './home-house-expert.component';

describe('HomeHouseExpertComponent', () => {
  let component: HomeHouseExpertComponent;
  let fixture: ComponentFixture<HomeHouseExpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeHouseExpertComponent]
    });
    fixture = TestBed.createComponent(HomeHouseExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
