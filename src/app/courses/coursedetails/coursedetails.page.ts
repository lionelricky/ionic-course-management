import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from 'src/app/service/enrollment.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpEventType } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { ToastController } from '@ionic/angular';
import { Enrollment } from 'src/app/models/enrollment';
import { CourseService } from 'src/app/service/course.service';
import { Course } from 'src/app/models/course';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.page.html',
  styleUrls: ['./coursedetails.page.scss'],
})
export class CoursedetailsPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, 
    private CourseService: CourseService,
    private enrollmentService: EnrollmentService, 
    private formBuilder: FormBuilder, 
    private decimalpipe: DecimalPipe,
    private apiService: ApiService,
    private toastController: ToastController) { }

  courseForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    time: new FormControl('',[Validators.required]),
    length: new FormControl('',[Validators.required]),
  });

  course: Course;
  enrollment: Enrollment[];
  message = "";
  id:string;
  updating:Boolean = false;

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != "0"){
      this.CourseService.getCoursesById(Number(this.id)).subscribe(courseData => {
        this.course = courseData;
        this.courseForm.patchValue({'name': this.course.name });
        this.courseForm.patchValue({'time': this.course.time });
        this.courseForm.patchValue({'length': this.course.length });
      });

      this.enrollmentService.getEnrollmentByCourseId(Number(this.id)).subscribe(enrollmentList => {
          this.enrollment = enrollmentList;
      });

    }
  }

  updateCourse(){
    if (this.courseForm.valid) {
      this.updating = true;
      let message =  "Success! Course created.";
      const fd = new FormData();
      if(this.id != "0"){
        fd.append('id', this.id.toString());
        message =  "Success! Course updated.";
      }
      fd.append('name', this. courseForm.value['name']);
      fd.append('time', this.courseForm.value['time']);
      fd.append('length', this.courseForm.value['length']);
      this.postData('http://www.rik-media.com/courses.php', fd, message);
    } else {
      this.message = "Please enter all required fields";
      this.presentToast();
    }
  }

  deleteCourse(id){
    const fd = new FormData();
    fd.append('delete', 'delete')
    fd.append('id', id.toString());
    const message = "Success! Course deleted."
    this.postData('http://www.rik-media.com/courses.php', fd, message);
  }

  postData(server:string, fd:FormData, message: string){
    this.apiService.postToApi(server, fd).subscribe(events =>
    {
      if (events.type == HttpEventType.Response)
      {
        let event = events.body;
        event = event.replace(/(^"|"$)/g, '');
        if (event === 'SUCCESS!') {
            this.message = message;
        }else {
          this.message = "An error occured, please try again.";
        }
        this.presentToast();
        this.returnToPage();
      }
    });
  }

  getDecimals(e){
    let number = this.decimalpipe.transform(e.target.value, '1.2-2');
    this.courseForm.get('length').setValue(number);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      color: 'primary',
      duration: 2000
    });
    toast.present();
  }

  leaveClass(id:number, courseid:number){
    const fd = new FormData();
    fd.append('delete', 'delete')
    fd.append('studentid', id.toString());
    fd.append('courseid', courseid.toString());
    this.postData('http://rik-media.com/enrollment.php', fd, "Student has left course.")
  }

  returnToPage(){
    this.router.navigateByUrl('/courses');
  }
}
