import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUserDB } from '../models/user.models';
import { BattleService } from '../services/battle.service';
import { IBattle } from '../models/battle.models';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  userData: IUserDB | null = null;
  userBattles: IBattle[] = [];

  constructor(public user: AuthService, public battle: BattleService) {}
  ngOnInit(): void {
    this.user.getUserData().subscribe((docs) => {
      docs.forEach((doc) => {
        this.userData = doc.data();
      });
    });
    this.battle.getUserBattles().subscribe((docs) => {
      this.userBattles = [];
      docs.forEach((doc) => {
        this.userBattles.push({
          docID: doc.id,
          ...doc.data(),
        });
      });
    });
  }
}
