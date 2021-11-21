import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public menuCtrl: MenuController, private apiService: ApiService, private toastController: ToastController, private router: Router) { }

  message: string;

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  login(){
    if (this.loginForm.valid) {
      const username = this.loginForm.value['username'];
      const password = this.loginForm.value['password'];
      this.apiService.getAuthentication(username, password)
    } else {
      this.message = "Please enter all required fields";
      this.presentToast();
    }
    if(this.apiService.validateAuthentication()){
      this.router.navigateByUrl('/welcome');
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      color: 'primary',
      duration: 2000
    });
    toast.present();
  }


}
