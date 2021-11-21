import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';
import { EnrollmentService } from '../service/enrollment.service';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private studentService: StudentService, 
    private courseService: CourseService, 
    private enrollmentService: EnrollmentService, 
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private router: Router) { }

  students:Student[] = [];
  courses:Course[] = [];
  enrollments:Enrollment[] =[];
  classes: string[];

  ngOnInit() {
    if(!this.apiService.validateAuthentication()){
      this.router.navigateByUrl('/login');
    }

    this.menuCtrl.enable(true);
    //initialize
    this.studentService.initializeStudentsFromApi();
    this.courseService.initializeCoursesFromApi();
    this.enrollmentService.initializeCoursesFromApi()
  }

  ionViewWillEnter(){
    this.studentService.getAllStudents().subscribe(studentData => {
      this.students = studentData;
    });
    this.courseService.getAllCourses().subscribe(studentData => {
      this.courses = studentData;
    });
    this.enrollmentService.getAllEnrollment().subscribe(enrollmentData => {
      this.enrollments = enrollmentData;
      this.classes = enrollmentData.map(item => item.name).filter((value, index, self) => self.indexOf(value) === index);
    });
  }

}
