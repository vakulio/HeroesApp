import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds = {
    email: '',
    password: ''
  };

  showAlert = false
  alertMsg = 'Please wait!'
  alertColor = 'blue'
  inSubmission = false

  constructor() {}

  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait!'
    this.alertColor = 'blue'
    this.inSubmission = true
  }
}
