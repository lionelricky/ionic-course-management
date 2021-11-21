import { Injectable } from '@angular/core';
import { of as observableOf, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpEventType,HttpHeaders  } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  students : Observable<Student[]>;
  student: Student;
  message: string = "";
  pageMode: string = "Edit";

  initializeStudentsFromApi(){
    const studentsApi = this.http.get<any>('http://www.rik-media.com/students.php')
        .pipe(items => {
            return items.pipe(map((items: Student[]) => items.sort(
                (a, b) => {
              return a.lastname.localeCompare(b.lastname) }
              )));
        });
        this.students = studentsApi;
  }

  getAllStudents(){
    return this.students;
  }

  getStudentsById(id: number){
    return this.students.pipe(map((items: Student[]) => items.filter((item: { id: any; }) => item.id == id)[0]));
  }

  setPageMode(mode: string){
    this.pageMode = mode;
  } 

  getPageMode(){
    return this.pageMode;
  }

  setMessage(message: string){
    this.message = message;
  };

  getMessage(){
    return this.message;
  }
}


 

  