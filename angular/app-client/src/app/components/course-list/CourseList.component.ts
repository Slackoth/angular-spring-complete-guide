import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'course-list',
  templateUrl: './CourseList.component.html',
  styleUrls: ['./CourseList.component.css']
})
export class CourseListComponent {
  courseList: string[] = ['ts','js','java','cpp'];
  hidden: boolean = false;

  toggleList = function() {
    this.hidden = !this.hidden;
  };
}
