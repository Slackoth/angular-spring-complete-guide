import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Client } from './client';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
// import { CLIENT_LIST } from './client-list.json';
// import localeES from '@angular/common/locales/es';

@Injectable()
export class ClientService {

  private http: HttpClient;
  private router: Router
  private endpointUrl: string = 'http://localhost:8080/app-client/clients';
  private httpHeaders: HttpHeaders = 
    new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  public findAllClients = (page: number): Observable<Client[]> => {
    // The "of" function transforms the Client array
    // into a Observable
    //return of(CLIENT_LIST);

    // Mapping JSON response to Client[]
    // this.http.get(this.endpointUrl).pipe(
    //   map(json => json as Client[])
    // );
    
    // Automatically maps the JSON response to Client[]
    return this.http
      .get(`${this.endpointUrl}/page/${page}`)
      .pipe(
        map((json: any) => {
          let clients = json.clients.content as Client[];
          return clients.map(c => {
            // registerLocaleData(localeES, 'es');

            // let datePipe = new DatePipe('es');
            // let datePipe = new DatePipe('en-US');
            c.firstName = c.firstName.toUpperCase();
            // c.lastName = c.lastName.toUpperCase();
            // c.createdAt = formatDate(c.createdAt, 'dd-MM-yyyy', 'en-US');
            // c.createdAt = datePipe.transform(c.createdAt), 'EEEE dd, MMM yyyy';
            // c.createdAt = datePipe.transform(c.createdAt), 'fullDate';
            // c.createdAt = datePipe.transform(c.createdAt), 'dd/MM/yyyy';
            return c;
          });
        }),
        catchError(json => { 
          console.log(json);
           
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: json.error.message
        })
        return throwError(json);
      }
    ));
  }

  public findClientById = (id: number): Observable<Client> => {
    return this.http.get(`${this.endpointUrl}/${id}`).pipe(
      map((json: any) => json.client as Client),
      catchError(json => {  
        this.router.navigate(['/clients']);
        Swal.fire({
          icon: 'error',
          title: 'Search Error',
          text: json.error.message
        })
        return throwError(json);
      })
    );
  }

  public createClient = (client: Client): Observable<Client> => {
    return this.http.post(this.endpointUrl, client, {
      headers: this.httpHeaders
    }).pipe(
      map((json: any) => json.client as Client),
      catchError(json => {
        if(json.status == 400)
          return throwError(json);
        
        this.router.navigate(['/clients']);
        Swal.fire({
          icon: 'error',
          title: 'Create Error',
          text: json.error.message
        })
        return throwError(json);
      })
    );
  }

  public updateClient = (client: Client): Observable<Client> => {
    return this.http.put(`${this.endpointUrl}/${client.id}`, client, {
      headers: this.httpHeaders
    }).pipe(
      map((json: any) => json.client as Client),
      catchError(json => {
        this.router.navigate(['/clients']);
        Swal.fire({
          icon: 'error',
          title: 'Update Error',
          text: json.error.message
        })
        return throwError(json);
      })
    );
  }

  public deleteClient = (id: number): Observable<Client> => {
    return this.http.delete(`${this.endpointUrl}/${id}`, {
      headers: this.httpHeaders
    }).pipe(
      map((json: any) => json.client as Client),
      catchError(json => {
        this.router.navigate(['/clients']);
        Swal.fire({
          icon: 'error',
          title: 'Delete Error',
          text: json.error.message
        })
        return throwError(json);
      })
    );
  }
}