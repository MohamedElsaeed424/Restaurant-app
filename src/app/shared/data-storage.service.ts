import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/services/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";


@Injectable({providedIn : 'root'}) 
export class DataStorageService {

    constructor (private http :HttpClient  , private resipesService : RecipeService){}

    postRecipes(){
        const allRecipes = this.resipesService.getRecipes();
        this.http.put<Recipe[]>(
            'https://restraunt-app-bf93b-default-rtdb.firebaseio.com/recipes.json',
            allRecipes
        ).subscribe((response)=>{
            console.log('All Recipes Saved');
            console.log(response);
        })
    }

    getRecipes(){
        return this.http.get<Recipe[]>(
            'https://restraunt-app-bf93b-default-rtdb.firebaseio.com/recipes.json'
        ).pipe( map( recipes =>{
            return recipes.map( recipe =>{
                return{...recipe , ingredients : recipe.ingredients? recipe.ingredients: [] }
            })
        }) ,tap((allrecipes)=>{
            this.resipesService.setRecipes(allrecipes) ;
        }) )
    }


}