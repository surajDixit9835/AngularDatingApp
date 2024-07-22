import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[FormsModule,CommonModule],
  standalone:true
})
export class RegisterComponent implements OnInit {

  accountService = inject(AccountService);
  model:any = {}
  @Input() userFromHomeComponent:any = {}
  @Output() cancelEventEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model)
    this.accountService.register(this.model).subscribe({
      next: users =>
        {
          console.log(users)
          this.cancel()
        },
        error:error=>{
          console.log(error);
        }
      
    })
  }

  cancel()
  {
    console.log("register:cancel");
    this.cancelEventEmitter.emit(false);
  }
}
