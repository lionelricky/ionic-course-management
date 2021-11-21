import { Injectable } from '@angular/core';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpEventType,HttpHeaders  } from '@angular/common/http';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  enrollment : Observable<Enrollment[]>;
  message: string = "";

  initializeCoursesFromApi(){
    const enrollmentApi = this.http.get<any>('http://www.rik-media.com/enrollment.php')
        .pipe(items => {
            return items.pipe(map((items: Enrollment[]) => items.sort(
                (a, b) => {
              return a.name.localeCompare(b.name) }
              )));
        });
        this.enrollment = enrollmentApi;
  }

  getAllEnrollment(){
    return this.enrollment;
  }

  getEnrollmentByCourseId(id: number){
    return this.enrollment.pipe(map((items: Enrollment[]) => items.filter((item: { courseid: number; }) => item.courseid == id)));
  }

  getEnrollmentByStudentId(id: number){
    return this.enrollment.pipe(map((items: Enrollment[]) => items.filter((item: { id: number; }) => item.id == id)));
  }

  setMessage(message: string){
    this.message = message;
  };

  getMessage(){
    return this.message;
  }
}


 

  