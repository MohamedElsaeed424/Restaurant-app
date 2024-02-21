import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule ,ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoopingListRoutingModule } from "./shopping-list-routing.module";


@NgModule({
    declarations:[  
        ShoppingListComponent,
        ShoppingEditComponent,
    ] ,
    imports:[
        CommonModule ,  
        RouterModule ,
        ReactiveFormsModule ,
        FormsModule ,
        ShoopingListRoutingModule
    ] 
})
export class ShoppingListModule {}