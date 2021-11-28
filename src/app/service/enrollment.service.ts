import { Injectable } from '@angular/core';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpEventType,HttpHeaders  } from '@angular/common/http';
import { Enrollment } from '../models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  message: string = "";
  enrollmentCtrl: number[] = [];

  getAllEnrollment(){
    return this.http.get<any>('http://www.rik-media.com/enrollment.php')
        .pipe(items => {
            return items.pipe(map((items: Enrollment[]) => items.sort(
                (a, b) => {
              return a.name.localeCompare(b.name) }
              )));
        });
  }

  getEnrollmentByCourseId(id: number){
    return this.getAllEnrollment().pipe(map((items: Enrollment[]) => items.filter((item: { courseid: number; }) => item.courseid == id)));
  }

  getEnrollmentByStudentId(id: number){
    return this.getAllEnrollment().pipe(map((items: Enrollment[]) => items.filter((item: { id: number; }) => item.id == id)));
  }

  setup(sId:number, cId:number){
    this.enrollmentCtrl = [];
    this.enrollmentCtrl.push(sId);
    this.enrollmentCtrl.push(cId);
  }

  getSetup(){
    return this.enrollmentCtrl;
  }

  setMessage(message: string){
    this.message = message;
  };

  getMessage(){
    return this.message;
  }
}


 

  