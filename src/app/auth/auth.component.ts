import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  isLoginMode : boolean = true ;
  isLoading : boolean = false ;
  error : string = null ;
  authForm : FormGroup ;

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email' : new FormControl(null , [Validators.required ,  Validators.email]) ,
      'password' : new FormControl(null , [Validators.required ,Validators.minLength(6)])
    })
  }

  onSwitch(){
    this.isLoginMode = ! this.isLoginMode ;
    this.error = null ;
  }

  onSubmit(){
    if (this.authForm.invalid){
      return ;
    }else{
      const email = this.authForm.get('email').value ;
      const password = this.authForm.get('password').value ;
      let autObs : Observable<AuthResponseData>;
      this.isLoading = true ;
      if(this.isLoginMode){
        autObs = this.authService.login(email , password) ;
      }else{
        autObs = this.authService.signUp(email , password) ;
      }
      autObs.subscribe(
        resData=>{
          console.log(resData);
          this.isLoading = false ;
        } ,
        errorMessage=>{
          console.log(errorMessage);
          this.error = errorMessage ;
          this.isLoading = false ;
        }
      ) ;
      this.authForm.reset() ;
    }
  }
}
