import { Component, Input } from '@angular/core';
import { IHero } from 'src/app/models/hero.models';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  showInfo = false

  @Input() heroes: IHero[] = [];

  open() {
    this.showInfo = true;
  }

  close() {
    this.showInfo = false;
  }

}
