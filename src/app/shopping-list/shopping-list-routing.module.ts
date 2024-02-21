import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";




const ShoopingListRoutes : Routes = [
    {path : 'shoppingList' , component : ShoppingListComponent} ,  
]

@NgModule({
    imports :[
        RouterModule.forRoot(ShoopingListRoutes) 
    ] ,
    exports:[
        RouterModule
    ]
})
export class ShoopingListRoutingModule {}