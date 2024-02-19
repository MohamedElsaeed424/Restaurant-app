import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from './models/auth.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/place-holder/place-holder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
  isLoginMode : boolean = true ;
  isLoading : boolean = false ;
  error : string = null ;
  authForm : FormGroup ;
  //pass type and will lock for the exsistance of 
  //that type in the templet
  @ViewChild(PlaceHolderDirective  , {static : true}) alertHolder : PlaceHolderDirective ;   
  closeSubc : Subscription ;

  constructor(
    private authService : AuthService , 
    private router : Router , 
    private route : ActivatedRoute ,
    private CFR : ComponentFactoryResolver 
  ){}

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
          if(this.isLoginMode){
            this.router.navigate(['/recipes'] , {relativeTo : this.route}) ;
          }else{
            this.onSwitch();
          }
        } ,
        errorMessage=>{
          console.log(errorMessage);
          this.error = errorMessage ;
          // this.showErrorAlert(errorMessage);
          this.isLoading = false ;
        }
      ) ;
      this.authForm.reset() ;
    }
  }

  onCloseAlert(){
    this.error = null ;
  }

  // private showErrorAlert (message : string){
  //   const alertComponentFactory =this.CFR.resolveComponentFactory(AlertComponent);
  //   const alertHolderVCRef = this.alertHolder.vcRef ;
  //   alertHolderVCRef.clear();
  //   const componentRef = alertHolderVCRef.createComponent(alertComponentFactory);
  //   componentRef.instance.message = message ;
  //   this.closeSubc =componentRef.instance.close.subscribe(()=>{
  //     alertHolderVCRef.clear();
  //   })
  // }

  // ngOnDestroy(): void {
  //   if (this.closeSubc){
  //     this.closeSubc.unsubscribe()
  //   }
  // }
}
