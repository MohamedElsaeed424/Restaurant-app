import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLoginMode : boolean = true ;
  authForm : FormGroup ;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email' : new FormControl(null , [Validators.required ,  Validators.email]) ,
      'password' : new FormControl(null , [Validators.required ,Validators.minLength(6)])
    })
  }

  onSwitch(){
    this.isLoginMode = ! this.isLoginMode ;
  }

  onSubmit(){
    console.log(this.authForm.value);

  }
}
