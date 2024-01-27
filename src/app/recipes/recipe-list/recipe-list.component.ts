import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  recipes : Recipe [] = [
    new Recipe('Mahshy' ,
               'This is Test recipe' ,
               'https://th.bing.com/th/id/R.80061b348256fa1aea364c0aa6a9e288?rik=biY8rhkLajBO3Q&pid=ImgRaw&r=0' )
  ] ;


}
