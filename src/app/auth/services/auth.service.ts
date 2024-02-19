import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import { AuthResponseData } from "../models/auth.model";
import { getAuth } from "firebase/auth";
import { User } from "../models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { JsonPipe } from "@angular/common";



@Injectable({providedIn : 'root'}) 
export class AuthService {
    authUser = new BehaviorSubject<User>(null);
    private tokenExpirationTimer  : any;
    
    constructor(private http : HttpClient ,    private route : ActivatedRoute ,
        private router : Router){}

    signUp(email : string , password : string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbV1_Gj85nkhkPYPnkzDLJbhGjrffTLeM' ,
            {email : email  , password : password  , returnSecureToken : true}  // needed for API for Firebase
        ).pipe(catchError(this.errorHandler) , tap(resData=>{
            this.AuthHandler(resData.email , resData.localid , resData.idToken , +resData.expiresIn) ;
        }))
    }

    login(email : string , password : string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbV1_Gj85nkhkPYPnkzDLJbhGjrffTLeM',
            {email : email  , password : password  , returnSecureToken : true} 
        ).pipe(catchError(this.errorHandler) , tap(resData=>{
            this.AuthHandler(resData.email , resData.localid , resData.idToken , +resData.expiresIn) ;
        }))
    }
    autoLogin(){
        let userData: {
            email : string  ,
            id : string ,
            _token : string ,
            _tokenExpirationDate : string
        }
        userData= JSON.parse(localStorage.getItem('userData')) ;
        if(!userData){
            return ;
        }
        const loadedUser = new User(userData.email , userData.id , userData._token ,new Date(userData._tokenExpirationDate) )
        if (loadedUser.token){
            this.authUser.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime() ;
            this.autoLogout(expirationDuration ) ;
        }
    }
    logout(){
        this.authUser.next(null);
        this.router.navigate(['/auth'] , {relativeTo : this.route});
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null ;
    }

    autoLogout(expirationDuration : number){
       this.tokenExpirationTimer = setTimeout(
            () => {
                this.logout();
            }, 
            expirationDuration
        );
    }

    private AuthHandler(email : string , userId : string, token : string , expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn *1000) ;
        const newUser = new User(email , userId , token , expirationDate) ;
        this.authUser.next(newUser);
        this.autoLogout(expiresIn *1000);
        localStorage.setItem('userData' ,JSON.stringify(newUser) );
    }

    private errorHandler(errorRes: HttpErrorResponse) {
        console.log(errorRes.error.error.message);
        let errorMessage = "Unknown error occurred!";
        if (!errorRes.error || !errorRes.error.error) {
            console.log("Network error or unexpected error format:", errorRes);
            return throwError(errorMessage);
        }
        const errorCode = errorRes.error.error.message;
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email is already in use. Please try another one.";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email address doesn't exist. Please sign up first.";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Invalid password. Please try again.";
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = "Check your login data";
                break ;
            default:
                console.log("Unhandled error code:", errorCode);
                break;
        }
        return throwError(errorMessage);
    }
}