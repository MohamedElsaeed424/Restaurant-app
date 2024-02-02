import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients : Ingredient [] = [new Ingredient("Salsa" , 20) , new Ingredient("Sugar" , 30)] ;


  onAddedItem(addedIngredient : Ingredient){
    this.ingredients.push(addedIngredient);
  }


}
