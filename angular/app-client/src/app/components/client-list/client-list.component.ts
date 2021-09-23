import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  private clientService: ClientService
  public clientList: Client[];

  constructor(clientService: ClientService) {
    this.clientService = clientService;
    this.clientList = this.clientService.getClientList();
  }
}
