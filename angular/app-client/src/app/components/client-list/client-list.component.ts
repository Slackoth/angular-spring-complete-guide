import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
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
  private aRoute: ActivatedRoute
  public clientList: Client[];

  constructor(service: ClientService, aRoute: ActivatedRoute) {
    this.service = service;
    this.aRoute = aRoute;
  }

  public ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if(!page)
        page = 0;

      this.service
        .findAllClients(page)
        .pipe(tap(clientList => this.clientList = clientList))
        .subscribe()
    });
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
