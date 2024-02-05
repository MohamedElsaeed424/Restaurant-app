import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoopingListService } from './services/shooping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css' 
})
export class ShoppingListComponent implements OnInit {
  ingredients : Ingredient [] ;

  constructor(private shoppingListService : ShoopingListService){}

  ngOnInit(): void {
    this.ingredients =  this.shoppingListService.getIngredients();
    this.shoppingListService.changedIngriedient
      .subscribe(
        (ingredients :Ingredient [])=>{
          this.ingredients = ingredients ;
        }
    )
  }
}
