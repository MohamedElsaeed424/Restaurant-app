import { NgModule } from "@angular/core";
import {PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";


const appRouter : Routes = [
    {path : '' ,redirectTo : '/recipes' , pathMatch : 'full'} ,
    {
        path : 'recipes' , 
        loadChildren :()=> import('./recipes/modules/recipes.module').then(module =>module.RecipeModule)
    } ,
    {
        path : 'shoppingList' , 
        loadChildren :()=> import('./shopping-list/modules/shopping-list.module').then(module =>module.ShoppingListModule)
    } , 
    {
        path : 'auth' , 
        loadChildren :()=> import('./auth/modules/auth.module').then(module =>module.AuthModule)
    }
]


@NgModule({
    imports :[
        RouterModule.forRoot(appRouter ,  {preloadingStrategy : PreloadAllModules}) 
    ] ,
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule {

}