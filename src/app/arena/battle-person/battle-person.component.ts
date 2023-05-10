import { Component, Input } from '@angular/core';
import { IHero } from 'src/app/models/hero.models';


@Component({
  selector: 'app-battle-person',
  templateUrl: './battle-person.component.html',
  styleUrls: ['./battle-person.component.css'],
})
export class BattlePersonComponent {
  @Input() person: IHero | null = null;
  @Input() status: 'hero' | 'enemy' = 'hero';
}
