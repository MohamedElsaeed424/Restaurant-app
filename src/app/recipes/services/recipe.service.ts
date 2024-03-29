import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoopingListService } from "../../shopping-list/services/shooping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    // selectedRecipe = new Subject<Recipe>() ;
    recipeChanges = new Subject<Recipe[]>();

//    private recipes : Recipe [] = [
//         new Recipe('Recipe1' ,
//                    'This is Test1 recipe' ,
//                    'https://th.bing.com/th/id/R.80061b348256fa1aea364c0aa6a9e288?rik=biY8rhkLajBO3Q&pid=ImgRaw&r=0',
//                    [new Ingredient("Salsa" , 20) , new Ingredient("Sugar" , 30)]
//                 ) ,
//                 new Recipe('Recipe2' ,
//                 'This is Test2 recipe' ,
//                 'https://www.halfbakedharvest.com/wp-content/uploads/2021/09/Healthier-Homemade-One-Pot-Hamburger-Helper-4.jpg',
//                 [new Ingredient("Rice" , 10) , new Ingredient("Onion" , 40)]
//              )
//     ] ;

    private recipes : Recipe[] = [] ;

    constructor(private shoppingListService : ShoopingListService){}

    setRecipes (recipes : Recipe[]){
        this.recipes = recipes ;
        this.recipeChanges.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice(); // to return a copy not the instance of this class
    }

    getRecipe(index : number){
      return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients : Ingredient []){
        this.shoppingListService.addIngredients(ingredients);
    }

    addNewRecipe( newRecipe : Recipe){
        this.recipes.push(newRecipe) ;
        this.recipeChanges.next(this.recipes.slice());
    }
    updateRecipe(recipeIndex : number , recipe : Recipe){
        this.recipes[recipeIndex]= recipe ;
        this.recipeChanges.next(this.recipes.slice());
    }

    deleteRecipe(recipeIndex : number){
        this.recipes.splice(recipeIndex ,1);
        this.recipeChanges.next(this.recipes.slice())
    }


}