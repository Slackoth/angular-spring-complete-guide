import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import localeES from '@angular/common/locales/es';

import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientService } from './components/client-list/client.service';
import { FooterBarComponent } from './components/footer-bar/FooterBar.component';
import { NavBarComponent } from './components/nav-bar/NavBar.component';
import { ClientFormComponent } from './components/client-list/client-form/client-form.component';
import { FormsModule } from '@angular/forms';
// import { registerLocaleData } from '@angular/common';

// registerLocaleData(localeES, 'es');

const routes: Routes = [
  {path: '', redirectTo: '/clients/page/0', pathMatch: 'full'},
  {path: 'clients', component: ClientListComponent},
  {path: 'clients/page/:page', component: ClientListComponent},
  {path: 'clients/form', component: ClientFormComponent},
  {path: 'clients/form/:id', component: ClientFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    ClientListComponent,
    ClientFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ClientService/*, {provide: LOCALE_ID, useValue: 'en-US'}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
