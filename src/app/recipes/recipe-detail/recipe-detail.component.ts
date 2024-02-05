import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoopingListService } from '../../shopping-list/services/shooping-list.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

 @Input() currentRecipe : Recipe;
 //                                        Using ShoppingListService 
//  constructor(private shoppingListService : ShoopingListService){}

//  onMoveToShoppingList(){
//     this.currentRecipe.ingredients.forEach(ingredient => {
//       this.shoppingListService.addIngredients(ingredient);
//     });
//   }

//                                         Using RecipeListService
    constructor(private recipeService : RecipeService){}

    onMoveToShoppingList(){
        this.recipeService.addIngredientsToShoppingList(this.currentRecipe.ingredients);
    }

}
