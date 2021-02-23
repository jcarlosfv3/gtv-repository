import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { ApiauthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  user!: User;

  constructor(public apiauth: ApiauthService, private router: Router) {
    this.apiauth.userObservable.subscribe(res => {
      this.user = res;
      console.log('cambio el objeto: ' + res);
    });
  }
  logout() {
    this.apiauth.logout();
    this.router.navigate(['/login']);
  }
}
