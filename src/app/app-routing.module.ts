import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";


const appRouter : Routes = [
    {path : '' ,redirectTo : '/recipes' , pathMatch : 'full'} ,
    {path : 'auth' , component : AuthComponent},
    // {path: '**' , redirectTo:{}} 
]


@NgModule({
    imports :[
        RouterModule.forRoot(appRouter) 
    ] ,
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {

}