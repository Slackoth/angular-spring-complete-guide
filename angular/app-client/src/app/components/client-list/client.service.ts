import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './client';
import { CLIENT_LIST } from './client-list.json';

@Injectable()
export class ClientService {
  getClientList = function(): Observable<Client[]> {
    // The "of" function transforms the Client array
    // into a Observable
    return of(CLIENT_LIST);
  }
}
