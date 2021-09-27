import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnInit {

  private service: ClientService
  private router: Router
  private aRoute: ActivatedRoute
  public errors: string[]
  public title: string = "Create Client";
  public client: Client = new Client(); 

  constructor(service: ClientService, router: Router, aRoute: ActivatedRoute) {
    this.service = service;
    this.router = router;
    this.aRoute = aRoute;
  }

  ngOnInit() {
    this.findById();
  }

  public findById = (): void => {
    this.aRoute.params.subscribe(params => {
      let id = params['id'];

      if(id)
        this.service.findClientById(id).subscribe(client =>
          this.client = client
        );
    })
  }

  public create = (): void => {
    this.service.createClient(this.client).subscribe(client => {
      this.router.navigate(['/clients']);
      Swal.fire('New client', `Client ${client.firstName} ${client.lastName}`, 'success');
    }, e => {
      this.errors = e.error.errors as string[];
    });
  }

  public update = (): void => {
    this.service.updateClient(this.client).subscribe(client => {
      this.router.navigate(['/clients']);
      Swal.fire('Client updated', `Client ${client.firstName} ${client.lastName}`, 'success');
    }, e => {
      this.errors = e.error.errors as string[];
    })
  }
}
