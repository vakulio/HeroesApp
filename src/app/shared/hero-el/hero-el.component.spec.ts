import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroElComponent } from './hero-el.component';

describe('HeroElComponent', () => {
  let component: HeroElComponent;
  let fixture: ComponentFixture<HeroElComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroElComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
