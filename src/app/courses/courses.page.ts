import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient,HttpEventType,HttpHeaders  } from '@angular/common/http';
import { Course } from '../models/Course';
import { CourseService } from 'src/app/service/course.service';
import { EnrollmentService } from '../service/enrollment.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  constructor(private router: Router, 
    private http: HttpClient, 
    private courserService: CourseService,
    private enrollmentService: EnrollmentService,
    private apiService: ApiService) { }

  courses: Course[];
  filteredCourses: Course[];
  noCourses: boolean = true;

  ngOnInit() {
    if(!this.apiService.validateAuthentication()){
      this.router.navigateByUrl('/login');
    }
    this.getAllCourseData();
  }

  ionViewDidEnter(){
    this.getAllCourseData();
  }

  filterCourses(event){
    const searchTerm = event.detail.value.toLowerCase();
    this.filteredCourses = this.courses.filter(x => (x.name.toLowerCase()).includes(searchTerm));
    this.noCourses = !this.filteredCourses.length;
  }

  navigateToUrl(id:number){
    this.router.navigateByUrl("/courses/coursedetails/"+id)
  }

  navigateToEnrollment(id:number){
    this.enrollmentService.setup(0,id);
    this.router.navigateByUrl("/enrollment")
  }

  getAllCourseData(){
    this.courserService.getAllCourses().subscribe(courseData => {
    this.courses = courseData;
    this.filteredCourses = courseData;
    this.noCourses = !courseData.length;
    });
  }
}
