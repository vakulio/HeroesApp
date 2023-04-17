import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {


  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
    ) {}

  openModal(event: Event) {
    event.preventDefault()
    this.modal.toggleModal("auth")
  }

  async logout(event: Event) {
    event.preventDefault()

    await this.afAuth.signOut()

    await this.router.navigateByUrl('/')
  }
}
