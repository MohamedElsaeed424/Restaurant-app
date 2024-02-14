import { Component, Input, OnInit, createNgModule } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoopingListService } from '../../shopping-list/services/shooping-list.service';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  currentRecipe : Recipe;
  recipeId : number ;
 //                                        Using ShoppingListService 
//  constructor(private shoppingListService : ShoopingListService){}

//  onMoveToShoppingList(){
//     this.currentRecipe.ingredients.forEach(ingredient => {
//       this.shoppingListService.addIngredients(ingredient);
//     });
//   }

//                                         Using RecipeListService
    constructor(private recipeService : RecipeService , private route : ActivatedRoute ,private router : Router){}

    ngOnInit(): void {
      this.route.params.subscribe(
        (params : Params)=>{
          this.recipeId = +params['id']
           this.currentRecipe=this.recipeService.getRecipe(this.recipeId) ;
        }
      )
    }

    onMoveToShoppingList(){
        this.recipeService.addIngredientsToShoppingList(this.currentRecipe.ingredients);
    }

    onEditRecipe(){
      this.router.navigate(['edit'] ,{relativeTo : this.route});
    }

    onDeleteRecipe(){
      this.recipeService.deleteRecipe(this.recipeId);
      this.router.navigate(['../'] , {relativeTo : this.route})
    }

}
