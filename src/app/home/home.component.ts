import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  registerMode= false;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle()
  {
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this.httpClient.get('https://localhost:5001/api/Appusers').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  cancelRegisterMode(event:boolean){
    console.log("home:cancel");
    this.registerMode = event
  }
}
