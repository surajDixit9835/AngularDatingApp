import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating app';
 
  accountService = inject(AccountService);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  

  setCurrentUser()
  {
    const userString:any = localStorage.getItem('User');
    const user: User = JSON.parse(userString);
    if(user)
    {
      this.accountService.setCurrentUser(user);
    }
  }

}
