import { Injectable } from '@angular/core';
import { Client } from './client';
import { CLIENT_LIST } from './client-list.json';

@Injectable()
export class ClientService {
  getClientList = function(): Client[] {
    return CLIENT_LIST;
  }
}
