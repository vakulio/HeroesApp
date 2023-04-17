import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-current-hero',
  templateUrl: './current-hero.component.html',
  styleUrls: ['./current-hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentHeroComponent {

}
