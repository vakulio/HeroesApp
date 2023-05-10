import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BattleService } from '../services/battle.service';
import { IBattle } from '../models/battle.models';
import { DatePipe } from '@angular/common';

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
  constructor(public battle: BattleService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.battle.getBattles().then((data) => {
      const newData = data.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      this.dataSource = newData;
      this.cd.detectChanges();
    });
  }
}
