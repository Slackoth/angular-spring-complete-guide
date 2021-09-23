import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientService } from './components/client-list/client.service';
import { CourseListComponent } from './components/course-list/CourseList.component';
import { FooterBarComponent } from './components/footer-bar/FooterBar.component';
import { NavBarComponent } from './components/nav-bar/NavBar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    CourseListComponent,
    ClientListComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
