import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input()  recipeItem :  Recipe  ;
  
  constructor(private recipeService : RecipeService ){}

  onSelectRecipe(){
    this.recipeService.selectedRecipe.emit(this.recipeItem);
  }
}
