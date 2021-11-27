import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../service/enrollment.service';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Student } from '../models/student';
import { Course } from '../models/course';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ApiService } from '../service/api.service';
import { HttpEventType } from '@angular/common/http';
import { Enrollment } from '../models/enrollment';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.page.html',
  styleUrls: ['./enrollment.page.scss'],
})

export class EnrollmentPage implements OnInit {

  constructor(private router: Router, 
    private studentService: StudentService, 
    private courseService: CourseService, 
    private toastController: ToastController,
    private enrollmentService: EnrollmentService,
    private apiService: ApiService) { }

    enrollmentForm = new FormGroup({
      studentid: new FormControl('', [Validators.required]),
      courseid: new FormControl('', [Validators.required]),
    });

    setupCtrl: number[] = [];
    students: Student[] = [];
    courses: Course[]= [];
    enrollments:number[]=[];
    course: Course;
    student: Student;
    typeSelected: string;
    message: string;
    loadStudents:boolean = true;
    loadCourse:boolean = true;

  ngOnInit() {
    // setupCtrl is [studentid,courseid]
    this.setupCtrl = this.enrollmentService.getSetup()

    if(this.setupCtrl[0]){
      // remove validators we get id from variable
      this.enrollmentForm.get('studentid').clearValidators();
      this.enrollmentForm.get('studentid').updateValueAndValidity();
      this.studentService.getStudentsById(Number(this.setupCtrl[0])).subscribe(studentData => {
        this.student = studentData;
        this.typeSelected = studentData.firstname + " " + studentData.lastname;
      });
    }

    if(this.setupCtrl[1])
    {
      // remove validators we get id from variable
      this.enrollmentForm.get('courseid').clearValidators();
      this.enrollmentForm.get('courseid').updateValueAndValidity();
      this.courseService.getCoursesById(Number(this.setupCtrl[1])).subscribe(courseData => {
        this.course = courseData;
        this.typeSelected = courseData.name;
      });
    }
  }

  ionViewDidEnter(){
    this.courseService.getAllCourses().subscribe(courseData => {
      this.loadCourse = true;
      if(this.student){
        this.enrollmentService.getEnrollmentByStudentId(Number(this.student.id)).subscribe(enrollmentData => {
           this.enrollments = enrollmentData.map(x => x.courseid);
           this.courses = courseData.filter(x => !this.enrollments.includes(x.id));
           this.loadCourse = false;
           this.checkloading();
        });
      } else {
        this.courses = courseData;
        this.loadCourse = false;
        this.checkloading();
      }
    });

    this.studentService.getAllStudents().subscribe(studentData => {
      if(this.course){
        this.enrollmentService.getEnrollmentByCourseId(Number(this.course.id)).subscribe(enrollmentData => {
          this.enrollments = enrollmentData.map(x => x.id);
          this.students = studentData.filter(x => !this.enrollments.includes(x.id));
          this.loadStudents = false;
          this.checkloading();
        });
      } else {
        this.students = studentData;
        this.loadStudents = false;
        this.checkloading();
      }
    });
  }

  compareStudentWith(o1: Student, o2: Student) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareCourseWith(o1: Course, o2: Course) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  checkloading() {
    return this.loadCourse || this.loadStudents;
  }

  updateEnrollment(){
    let message = "Success! Enrollment updated.";
    if (this.enrollmentForm.valid) {
      const fd = new FormData();
      if(this.student){
        fd.append('studentid', this.student.id.toString());
        fd.append('courseid', this.enrollmentForm.value['courseid'].id);
      } else if(this.course){
        fd.append('courseid', this.course.id.toString());
        fd.append('studentid', this.enrollmentForm.value['studentid'].id);
      } else {
        fd.append('studentid', this.enrollmentForm.value['studentid'].id);
        fd.append('courseid', this.enrollmentForm.value['courseid'].id);
      }

      this.apiService.postToApi('http://www.rik-media.com/enrollment.php', fd).subscribe(events =>
      {
        if (events.type == HttpEventType.Response)
        {
          let event = events.body;
          event = event.replace(/(^"|"$)/g, '');
          if (event === 'SUCCESS!') {
              this.message = message;
              this.presentToast();
              this.router.navigateByUrl('/welcome')
          }else {
            this.message = "An error occured, please try again.";
            this.presentToast('danger');
          }
        }
      });
    } else {
      this.message = "Please enter all required fields";
      this.presentToast('danger');
    }
  }

  async presentToast(color:string = null) {
    if(!color){
      color = 'primary';
    }
    const toast = await this.toastController.create({
      message: this.message,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  checkData() {
    let enrollments:number[] = [];
    this.message = "Student already enrolled"
    if(this.course){
      let studentid = this.enrollmentForm.value['studentid'].id;
      this.enrollmentService.getEnrollmentByCourseId(Number(this.course.id)).subscribe(enrollmentData => {
        enrollments = enrollmentData.map(x => x.id);
        let isEnrolled = enrollments.filter(x => x == studentid).length;
        if(isEnrolled){
          this.presentToast('danger');
        } else {
          this.updateEnrollment();
        }
     });
    }

    if(this.student){
      let courseid = this.enrollmentForm.value['courseid'].id
      this.enrollmentService.getEnrollmentByStudentId(Number(this.student.id)).subscribe(enrollmentData => {
        enrollments = enrollmentData.map(x => x.courseid);
        let isEnrolled = enrollments.filter(x => x == courseid).length;
        if(isEnrolled){
          this.presentToast('danger')
        } else {
          this.updateEnrollment();
        }
     });
    }
  }
}
