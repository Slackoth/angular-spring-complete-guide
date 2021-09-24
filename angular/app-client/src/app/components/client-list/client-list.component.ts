import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit{
  private service: ClientService
  public clientList: Client[];

  constructor(service: ClientService) {
    this.service = service;
  }

  public ngOnInit() {
    this.service
      .findAllClients()
      .subscribe(clientList => this.clientList = clientList);
  }

  public delete = (client: Client): void => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteClient(client.id).subscribe(_ => {
          this.clientList = this.clientList.filter(c => c !== client);
          Swal.fire(
            'Client Deleted',
            'The client has been deleted',
            'success'
          )
        })
      }
    })
  }
}
