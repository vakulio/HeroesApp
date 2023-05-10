import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-battle-person',
  templateUrl: './battle-person.component.html',
  styleUrls: ['./battle-person.component.css'],
})
export class BattlePersonComponent {
  @Input() person: any;
}
