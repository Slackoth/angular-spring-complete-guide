import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientService } from './components/client-list/client.service';
import { FooterBarComponent } from './components/footer-bar/FooterBar.component';
import { NavBarComponent } from './components/nav-bar/NavBar.component';

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'clients', component: ClientListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    ClientListComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
