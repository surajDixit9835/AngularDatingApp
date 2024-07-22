import { HttpClient } from '@angular/common/http';
// import { inject, Injectable, signal } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl:string = "https://localhost:5001/api/"
  private http = inject(HttpClient)
  // const currentUsers = signal<User | null>(null);
  currentUserSource = new BehaviorSubject<User |null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  login(model:User){
    return this.http.post<User>(this.baseUrl+"account/login",model).pipe(
      map((response:User) =>{
        const user = response;
        if(user)
        {
          localStorage.setItem('User',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post(this.baseUrl+"account/register?uName="+model.uName+"&password="+model.password+"",null).pipe(
      map((response) =>{
        const user = response;
        if(user)
        {
          localStorage.setItem('User',JSON.stringify(user));
          const registerUser:User = {username:model.uName,token:model.password};

          this.currentUserSource.next(registerUser);
        }
        
      })
    );
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('User')
    this.currentUserSource.next(null)
  }
}
