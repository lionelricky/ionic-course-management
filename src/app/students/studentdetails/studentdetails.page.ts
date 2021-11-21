import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/service/student.service';
import { EnrollmentService } from 'src/app/service/enrollment.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpEventType } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { ToastController } from '@ionic/angular';
import { Enrollment } from 'src/app/models/enrollment';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.page.html',
  styleUrls: ['./studentdetails.page.scss'],
})
export class StudentdetailsPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, 
    private studentService: StudentService,
    private enrollmentService: EnrollmentService, 
    private formBuilder: FormBuilder, 
    private apiService: ApiService,
    private toastController: ToastController) { }

  studentForm = new FormGroup({
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    dob: new FormControl('',[Validators.required]),
  });
  
  student: Student;
  enrollment: Enrollment[];
  defaultDate:Date = new Date();
  message = "";
  id:string;
  updating:Boolean = false;
  pageMode = "Edit"
  serverStudent = "http://www.rik-media.com/students.php" 
  serverEnrolment = "http://www.rik-media.com/enrollment.php"

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pageMode = this.studentService.getPageMode();
    if(this.id != "0"){
      this.studentService.getStudentsById(Number(this.id)).subscribe(studentData => {
        this.student = studentData;
        this.studentForm.patchValue({'firstname': this.student.firstname });
        this.studentForm.patchValue({'lastname': this.student.lastname });
        this.studentForm.patchValue({'dob': this.student.dateofbirth });
        this.defaultDate = new Date(this.student.dateofbirth);
      });

      this.enrollmentService.getEnrollmentByStudentId(Number(this.id)).subscribe(enrollmentList => {
          this.enrollment = enrollmentList;
      });

    }
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(date, {
       onlyself: true
    })
  }

  updateStudent(){
    if (this.studentForm.valid) {
      this.updating = true;
      let message =  "Success! Student created.";
      const fd = new FormData();
      if(this.id != "0"){
        fd.append('id', this.id.toString());
        message =  "Success! Student updated.";
      }
      fd.append('firstname', this.studentForm.value['firstname']);
      fd.append('lastname', this.studentForm.value['lastname']);
      fd.append('dateofbirth', this.studentForm.value['dob']);
      this.postData(this.serverStudent, fd, message);
    } else {
      this.message = "Please enter all required fields";
      this.presentToast();
    }
  }

  deleteStudent(id){
    const fd = new FormData();
    fd.append('delete', 'delete')
    fd.append('id', id.toString());
    const message = "Success! Student deleted."
    this.postData(this.serverStudent, fd, message);
  }

  leaveClass(id:number, courseid:number){
    const message = "Student has left course."
    const fd = new FormData();
    fd.append('delete', 'delete')
    fd.append('studentid', id.toString());
    fd.append('courseid', courseid.toString());
    this.postData(this.serverEnrolment, fd, message)
  }

  postData(server:string ,fd:FormData, message: string){
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
        this.returnToStudentsPage();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      color: 'primary',
      duration: 2000
    });
    toast.present();
  }

  returnToStudentsPage(){
    this.router.navigateByUrl('/students');
  }
}

