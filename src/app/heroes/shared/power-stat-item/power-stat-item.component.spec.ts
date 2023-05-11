import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerStatItemComponent } from './power-stat-item.component';

describe('PowerStatItemComponent', () => {
  let component: PowerStatItemComponent;
  let fixture: ComponentFixture<PowerStatItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerStatItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerStatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
