import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { StudentService } from './service/student.service';
import { CourseService } from './service/course.service';
import { EnrollmentService } from './service/enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  isAutenticated:boolean = true;
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
    private studentService: StudentService, 
    private courseService: CourseService,
    private enrollmentService: EnrollmentService) {}

  ngOnInit(){
    if(!this.isAutenticated)
    {
      this.router.navigateByUrl("/login")
      this.menuCtrl.enable(false, 'mainMenu');
    } else{
      this.studentService.initializeStudentsFromApi();
      this.courseService.initializeCoursesFromApi();
      this.enrollmentService.initializeCoursesFromApi()
    }
  }
}
