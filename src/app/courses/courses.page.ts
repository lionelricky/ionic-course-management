import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient,HttpEventType,HttpHeaders  } from '@angular/common/http';
import { Course } from '../models/Course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private courserService: CourseService) { }

  courses: Course[];
  filteredCourses: Course[];
  noCourses: boolean = true;

  ngOnInit() {
    this.getAllCourseData();
  }

  ionViewDidEnter(){
    this.getAllCourseData();
  }

  filterStudents(event){
    const searchTerm = event.detail.value.toLowerCase();
    this.filteredCourses = this.courses.filter(x => (x.name.toLowerCase()).includes(searchTerm));
    this.noCourses = !this.filteredCourses.length;
  }

  navigateToUrl(id:number){
    this.router.navigateByUrl("/courses/coursedetails/"+id)
  }

  getAllCourseData(){
    this.courserService.getAllCourses().subscribe(courseData => {
    this.courses = courseData;
    this.filteredCourses = courseData;
    this.noCourses = !courseData.length;
    });
  }
}
