import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackersAndMoversFaqComponent } from './packers-and-movers-faq.component';



describe('PackersAndMoversFaqComponent', () => {
  let component: PackersAndMoversFaqComponent;
  let fixture: ComponentFixture<PackersAndMoversFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackersAndMoversFaqComponent]
    });
    fixture = TestBed.createComponent(PackersAndMoversFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
