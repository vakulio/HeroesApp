import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUserDB } from '../models/user.models';
import { BattleService } from '../services/battle.service';
import { IBattle } from '../models/battle.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class AccountComponent implements OnInit {
  userData: IUserDB | null = null;
  userBattles: IBattle[] = [];
  displayedColumns: string[] = [
    'userName',
    'timestamp',
    'heroName',
    'enemyName',
    'result',
  ];

  constructor(
    public user: AuthService,
    public battle: BattleService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.user.getUserData().subscribe((docs) => {
      const userData = docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      this.userData = userData[0];
    });
    this.battle.getUserBattles().subscribe((docs) => {
      const battleData = docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      this.userBattles = battleData;
      this.cd.detectChanges();
    });
  }
}
