import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";

const appRouter : Routes = [
    {path : '' ,redirectTo : '/recipes' , pathMatch : 'full'} ,
    {path : 'recipes' , component : RecipesComponent , children :[
        {path : ':id' , component : RecipeItemComponent}
    ]} ,
    {path : 'shoppingList' , component : ShoppingListComponent}
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