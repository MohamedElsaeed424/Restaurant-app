import { EventEmitter } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoopingListService {
   private ingredients : Ingredient[] = [] ;

   changedIngriedient  = new Subject<Ingredient [] >();

   getIngredients(){
    return this.ingredients.slice() ;
   }

   addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient) ;
    this.changedIngriedient.next(this.ingredients.slice()) ;
   }

   addIngredients(newIngredients : Ingredient[]){
      this.ingredients.push(...newIngredients);
      this.changedIngriedient.next(newIngredients.slice())
   }


}