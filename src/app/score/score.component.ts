import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BattleService } from '../services/battle.service';
import { IBattle } from '../models/battle.models';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class ScoreComponent implements OnInit {
  displayedColumns: string[] = [
    'userName',
    'timestamp',
    'heroName',
    'enemyName',
    'result',
  ];
  dataSource: IBattle[] = [];
  scoreOrder = 'asc';
  constructor(
    public battle: BattleService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBattles();
  }

  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
    this.getBattles();
  }

  getBattles() {
    this.route.queryParams.subscribe((params) => {
      this.scoreOrder = params['sort'];
      this.battle.getBattles(this.scoreOrder).then((data) => {
        const newData = data.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        this.dataSource = newData;
        this.cd.detectChanges();
      });
    });

  }
}
