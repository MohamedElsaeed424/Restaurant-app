import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeReSolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/guards/auth.guard";

const appRouter : Routes = [

    {path : '' ,redirectTo : '/recipes' , pathMatch : 'full'} ,
    {path : 'recipes' , component : RecipesComponent  ,  canActivate:[AuthGuard], children :[
        {path :'' , component :RecipeStartComponent } ,
        {path : 'new' , component : RecipeEditComponent} ,
        {path : ':id' , component : RecipeDetailComponent ,  resolve :[RecipeReSolverService]},
        {path : ':id/edit' , component : RecipeEditComponent , resolve :[RecipeReSolverService]}
    ]} ,
    {path : 'shoppingList' , component : ShoppingListComponent} ,
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