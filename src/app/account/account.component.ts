import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/user.models';
import { BattleService } from '../services/battle.service';
import { IBattle } from '../models/battle.models';
import { DatePipe } from '@angular/common';
import { IUserPowerups } from '../models/powerup.models';
import { PowersService } from '../services/powers.service';
import { POWERUPS } from '../constants/powerups';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class AccountComponent implements OnInit {
  userData: IUser | null = null;
  userBattles: IBattle[] = [];
  displayedColumns: string[] = [
    'userName',
    'timestamp',
    'heroName',
    'enemyName',
    'result',
  ];
  userPower: IUserPowerups = {} as IUserPowerups;
  userpowerupslist = POWERUPS;

  constructor(
    public user: AuthService,
    public battle: BattleService,
    private cd: ChangeDetectorRef,
    private powerups: PowersService
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
    });
    this.powerups.getPowerupsData().subscribe((docs) => {
      const powerData = docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      this.userPower = powerData[0];
      this.cd.detectChanges();
    });
  }
}
