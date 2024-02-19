import { EventEmitter } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoopingListService {
   private ingredients : Ingredient[] = [] ;

   changedIngriedient  = new Subject<Ingredient [] >();
   itemEditIndex = new Subject<number>() ;

   getIngredients(){
    return this.ingredients.slice() ;
   }

   getIngredient(index : number){
      return this.ingredients[index] ;
   }

   addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient) ;
    this.changedIngriedient.next(this.ingredients.slice()) ;
   }

   addIngredients(newIngredients : Ingredient[]){
      this.ingredients.push(...newIngredients);
      this.changedIngriedient.next(newIngredients.slice())
   }

   editIngredient(ingredientIndex : number , newName : string , newAmount : number){
      const newIngriedent = new Ingredient(newName , newAmount);
      this.ingredients[ingredientIndex] = newIngriedent ;
      this.changedIngriedient.next(this.ingredients.slice())
   }

   deleteIngredient(ingredientIndex : number){
      this.ingredients.splice(ingredientIndex ,  1) ;
      this.changedIngriedient.next(this.ingredients.slice()) ;
   }

}