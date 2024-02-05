import { EventEmitter } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";

export class ShoopingListService {
   private ingredients : Ingredient[] = [new Ingredient("Salsa" , 20) , new Ingredient("Sugar" , 30)] ;

   getIngredients(){
    return this.ingredients.slice() ;
   }

   addIngredients(ingredient : Ingredient){
    this.ingredients.push(ingredient) ;
   }
}