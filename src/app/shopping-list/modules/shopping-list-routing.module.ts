import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "../shopping-list.component";

const ShoopingListRoutes : Routes = [
    {path : '' , component : ShoppingListComponent} ,  
]

@NgModule({
    imports :[
        RouterModule.forChild(ShoopingListRoutes) 
    ] ,
    exports:[
        RouterModule
    ]
})
export class ShoopingListRoutingModule {}