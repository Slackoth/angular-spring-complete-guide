import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: String = 'Welcome to Angular';
  course: String = 'Angular & Spring Course';
  student: String = 'Luis Perla';
}
