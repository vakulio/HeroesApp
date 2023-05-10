import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUserDB } from '../models/user.models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  userData: IUserDB | null = null;

  constructor(public user: AuthService) {
    user.getUserData().subscribe((docs) => {
      docs.forEach((doc) => {
        this.userData = doc.data();
      });
    });
  }
}
