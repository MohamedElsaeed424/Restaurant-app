import { EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";


export class RecipeService {

    selectedRecipe = new EventEmitter<Recipe>() ;

   private recipes : Recipe [] = [
        new Recipe('Mahshy' ,
                   'This is Test recipe' ,
                   'https://th.bing.com/th/id/R.80061b348256fa1aea364c0aa6a9e288?rik=biY8rhkLajBO3Q&pid=ImgRaw&r=0' )
    ] ;

    getRecipes(){
        return this.recipes.slice() ; // to return a copy not the instance of this class
    }


}