import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './client';
import { map } from 'rxjs/operators';
// import { CLIENT_LIST } from './client-list.json';

@Injectable()
export class ClientService {

  private http: HttpClient;
  private endpointUrl: string = 'http://localhost:8080/app-client/clients';
  private httpHeaders: HttpHeaders = 
    new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(http: HttpClient) {
    this.http = http;
  }

  public findAllClients = (): Observable<Client[]> => {
    // The "of" function transforms the Client array
    // into a Observable
    //return of(CLIENT_LIST);

    // Mapping JSON response to Client[]
    this.http.get(this.endpointUrl).pipe(
      map(response => response as Client[])
    );
    
    // Automatically maps the JSON response to Client[]
    return this.http.get<Client[]>(this.endpointUrl);
  }

  public findClientById = (id: number): Observable<Client> => {
    return this.http.get<Client>(`${this.endpointUrl}/${id}`);
  }

  public createClient = (client: Client): Observable<Client> => {
    return this.http.post<Client>(this.endpointUrl, client, {
      headers: this.httpHeaders
    });
  }

  public updateClient = (client: Client): Observable<Client> => {
    return this.http.put<Client>(`${this.endpointUrl}/${client.id}`, client, {
      headers: this.httpHeaders
    });
  }

  public deleteClient = (id: number): Observable<Client> => {
    return this.http.delete<Client>(`${this.endpointUrl}/${id}`, {
      headers: this.httpHeaders
    });
  }
}
