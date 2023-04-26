import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-current-hero',
  templateUrl: './current-hero.component.html',
  styleUrls: ['./current-hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentHeroComponent implements OnInit {
  id = ''

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
      })
  }

}
