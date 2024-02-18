import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import {throwError} from "rxjs";
import { AuthResponseData } from "./auth.model";
import { getAuth } from "firebase/auth";



@Injectable({providedIn : 'root'}) 
export class AuthService {
    // const auth = getAuth(app);

    constructor(private http : HttpClient){}

    signUp(email : string , password : string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbV1_Gj85nkhkPYPnkzDLJbhGjrffTLeM' ,
            {email : email  , password : password  , returnSecureToken : true}  // needed for API for Firebase
        ).pipe(catchError(this.errorHandler))
    }

    login(email : string , password : string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbV1_Gj85nkhkPYPnkzDLJbhGjrffTLeM',
            {email : email  , password : password  , returnSecureToken : true} 
        ).pipe(catchError(this.errorHandler))
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