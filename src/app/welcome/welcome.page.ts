import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private studentService: StudentService, private courseService: CourseService) { }

  students:Student[];

  ngOnInit() {
    this.studentService.initializeStudentsFromApi();
    this.courseService.initializeCoursesFromApi();
    this.studentService.getAllStudents().subscribe(studentData => {
      this.students = studentData;
    });
  }

}
