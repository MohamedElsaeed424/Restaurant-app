import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeReSolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/guards/auth.guard";

const RecipesRoutes = [
    {path : 'recipes' , component : RecipesComponent  ,  canActivate:[AuthGuard], children :[
        {path :'' , component :RecipeStartComponent } ,
        {path : 'new' , component : RecipeEditComponent} ,
        {path : ':id' , component : RecipeDetailComponent ,  resolve :[RecipeReSolverService]},
        {path : ':id/edit' , component : RecipeEditComponent , resolve :[RecipeReSolverService]}
    ]} ,
]
@NgModule({
    imports :[RouterModule.forRoot(RecipesRoutes)] ,
    exports:[RouterModule]
})
export class RecipesRoutingModule {

}