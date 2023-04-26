import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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

  constructor(
    private auth: AngularFireAuth
  ) {}

  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait!'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.creds.email, this.creds.password
      )
    } catch (error) {
      this.alertMsg = 'Some error. Please try again'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Success!'
    this.alertColor = 'green'

  }
}
