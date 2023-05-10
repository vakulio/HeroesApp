import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlePersonComponent } from './battle-person.component';

describe('BattlePersonComponent', () => {
  let component: BattlePersonComponent;
  let fixture: ComponentFixture<BattlePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlePersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattlePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
