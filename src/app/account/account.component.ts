import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  userData = {}

  constructor(
    public user: AuthService
  ){
    user.getUserData().subscribe(docs => {
      this.userData = {}
      docs.forEach(doc => {
        this.userData = doc.data()
      })
    })
  }
}
