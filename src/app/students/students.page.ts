import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from 'src/app/service/student.service';
import { ToastController } from '@ionic/angular';
import { EnrollmentService } from '../service/enrollment.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit{

  constructor(private router: Router, 
    private studentService: StudentService, 
    private toastController: ToastController,
    private enrollmentService: EnrollmentService) { }

  students:Student[];
  filteredStudents: Student[];
  noStudents:boolean = true;
  pageMode:string = "Edit";
  message:string = "";

  ngOnInit() {
    this.getAllStudentData();
  }

  ionViewDidEnter(){
    this.getAllStudentData();
  }

  filterStudents(event){
    const searchTerm = event.detail.value.toLowerCase();
    this.filteredStudents = this.students.filter(x => (x.firstname.toLowerCase()).includes(searchTerm) || (x.lastname.toLowerCase()).includes(searchTerm));
    this.noStudents = !this.filteredStudents.length;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      color: 'primary',
      duration: 2000
    });
    toast.present();
  }

  navigateToUrl(id:number, mode:string){
    this.studentService.setPageMode(mode);
    this.router.navigateByUrl("/students/studentdetails/"+id)
  }

  navigateToEnrollment(id:number){
    this.enrollmentService.setup(id,0);
    this.router.navigateByUrl("/enrollment")
  }

  getAllStudentData(){
    this.studentService.getAllStudents().subscribe(studentData => {
      this.students = studentData;
      this.filteredStudents = studentData;
      this.noStudents = !studentData.length;
    });
  }

}
