import { EventEmitter } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";

export class ShoopingListService {
   private ingredients : Ingredient[] = [] ;

   changedIngriedient  = new EventEmitter<Ingredient [] >();

   getIngredients(){
    return this.ingredients.slice() ;
   }

   addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient) ;
    this.changedIngriedient.emit(this.ingredients.slice()) ;
   }

   addIngredients(newIngredients : Ingredient[]){
      this.ingredients.push(...newIngredients);
      this.changedIngriedient.emit(newIngredients.slice())
   }


}