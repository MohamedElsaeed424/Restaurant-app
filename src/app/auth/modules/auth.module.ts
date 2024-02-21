import { NgModule } from "@angular/core";
import { AuthComponent } from "../auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
    declarations :[
        AuthComponent
    ] ,
    imports:[
        CommonModule ,
        ReactiveFormsModule,
        AuthRoutingModule ,
        SharedModule
    ]
})


export class AuthModule {}