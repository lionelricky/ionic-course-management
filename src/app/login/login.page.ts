import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);

    // const isLoggedIn = false;
    // const router = document.querySelector('ion-router');
    // const routeRedirect = document.createElement('ion-route-redirect');
    // routeRedirect.setAttribute('from', '*');
    // routeRedirect.setAttribute('to', '/login');

    // if (!isLoggedIn) {
    //   router.appendChild(routeRedirect);
    // }

  }

}
