import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  fausergraduate = faUserGraduate;
  fagraduationcap = faGraduationCap;
  faschool = faSchool;

  public appPages = [
    { title: 'Welcome', url: '/welcome', icon: 'faschool'},
    { title: 'Students', url: '/students', icon: 'fausergraduate' },
    { title: 'Courses', url: '/courses', icon: 'fagraduationcap' },
  ];
  constructor(private router: Router, 
    public menuCtrl: MenuController, 
    private apiService: ApiService) {}

  ngOnInit(){
    if(!this.apiService.validateAuthentication())
    {
      this.router.navigateByUrl("/login")
      this.menuCtrl.enable(false, 'mainMenu');
    } 
  }
}
