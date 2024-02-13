import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoopingListService } from './services/shooping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css' 
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients : Ingredient [] ;
  private ingredientsSubsc : Subscription ;

  constructor(private shoppingListService : ShoopingListService){}

  ngOnInit(): void {
    this.ingredients =  this.shoppingListService.getIngredients();
    this.ingredientsSubsc = this.shoppingListService.changedIngriedient
      .subscribe(
        (ingredients :Ingredient [])=>{
          this.ingredients = ingredients ;
        }
    )
  }
  ngOnDestroy(): void {
    this.ingredientsSubsc.unsubscribe() ;
  }

  onEditItem(recipeIndex : number ){
    this.shoppingListService.itemEditIndex.next(recipeIndex) ;
  }
}
