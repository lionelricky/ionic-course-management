import { Injectable } from '@angular/core';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpEventType,HttpHeaders  } from '@angular/common/http';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  courses : Observable<Course[]>;
  course: Course;
  message: string = "";

  initializeCoursesFromApi(){
    const courseApi = this.http.get<any>('http://www.rik-media.com/courses.php')
        .pipe(items => {
            return items.pipe(map((items: Course[]) => items.sort(
                (a, b) => {
              return a.name.localeCompare(b.name) }
              )));
        });
    this.courses = courseApi;
  }

  getAllCourses(){
    return this.courses;
  }

  getCoursesById(id: number){
    return this.courses.pipe(map((items: Course[]) => items.filter((item: { id: any; }) => item.id == id)[0]));
  }

  setMessage(message: string){
    this.message = message;
  };

  getMessage(){
    return this.message;
  }
}


 

  