import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../recipe.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataStorageService } from "../../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn : 'root'})
export class RecipeReSolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageSrveice : DataStorageService , private recipeService : RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes() ;
        if (recipes.length===0){
            return this.dataStorageSrveice.getRecipes() ;   // no need for subscribing here 
                                                            //  Angular dose this for me using resolve method
        }else{
            return recipes ;
        }
    }                                                 
}