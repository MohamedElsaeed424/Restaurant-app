import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  recipeId : number ;
  allowEdit : boolean  =false;
  recipeForm : FormGroup  ;
  // imagePath : string

  constructor(private route : ActivatedRoute ,
              private  recipeService: RecipeService ,
              private router : Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params)=>{
        this.allowEdit = params['id'] != null ? true : false ;
        this.recipeId = params['id'];
        this.initForm();
      }
    )
      // this.imagePath = this.recipeForm.value.recipeData.iurlc ;
  }
  
  private initForm(){
    let rname =' '  ;
    let iurl =  ' ';
    let desc = ' ';
    let ringredients = new FormArray([]) ;
    if(this.allowEdit){
     let recipe : Recipe =  this.recipeService.getRecipe(this.recipeId) ;
     rname = recipe.name ;
     iurl = recipe.imagePath ;
     desc = recipe.description
     if (recipe['ingredients']){
      for (const ingredient of recipe.ingredients) {
        ringredients.push(
          new FormGroup({
             'inamec' : new FormControl(ingredient.name , Validators.required) ,
             'amountc' : new FormControl(ingredient.amount , 
                [
                  Validators.required ,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]
              )
          })
        )
      }
     }
    }
    this.recipeForm = new FormGroup({
      'recipeData': new FormGroup({
        'rnamec' : new FormControl(rname , Validators.required) ,
        'iurlc' : new FormControl(iurl , Validators.required) ,
        'descc' : new FormControl(desc , Validators.required) 
      }) ,
      'recipeIngriedients' : ringredients
    });
  }

  getIngredientControles(){
    return (<FormArray>this.recipeForm.get('recipeIngriedients')).controls ;
  }

  onAddIngredientControl(){
    (<FormArray>this.recipeForm.get('recipeIngriedients')).push(
      new FormGroup({
        'inamec' : new FormControl(null , Validators.required) ,
        'amountc' : new FormControl(null , 
          [
            Validators.required ,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ]
        )
      })
    )
  }
  onDeleteIngredientControl(index : number){
    (<FormArray>this.recipeForm.get('recipeIngriedients')).removeAt(index);
  }

  onSubmit(){
    let newRecipe : Recipe = new Recipe(
      this.recipeForm.value.recipeData.rnamec,
      this.recipeForm.value.recipeData.descc ,
      this.recipeForm.value.recipeData.iurlc,
      this.recipeForm.value.recipeIngriedients.map( 
        (fg : {inamec : string , amountc : number})=>{
          return new Ingredient(fg.inamec , fg.amountc);
        }
      )
    );
    if(this.allowEdit){
      this.recipeService.updateRecipe(this.recipeId , newRecipe)
    }else{
      this.recipeService.addNewRecipe(newRecipe)
    }
    this.onCancle();
  }
  onCancle(){
    this.router.navigate(['../'] , {relativeTo : this.route} ) ;
  }

}
