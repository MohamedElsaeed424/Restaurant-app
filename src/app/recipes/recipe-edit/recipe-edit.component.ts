import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  recipeId : number ;
  allowEdit : boolean  =false;
  recipeForm : FormGroup  ;

  constructor(private route : ActivatedRoute , private  recipeService: RecipeService){}

  ngOnInit(): void {

    this.route.params.subscribe(
      (params : Params)=>{
        this.allowEdit = params['id'] != null ? true : false ;
        this.recipeId = params['id'];
        this.initForm();
      }
    )
  }
  
  private initForm(){
    let rname =' '  ;
    let iurl =  ' ';
    let desc = ' ';
    if(this.allowEdit){
     let recipe : Recipe =  this.recipeService.getRecipe(this.recipeId) ;
     rname = recipe.name ;
     iurl = recipe.imagePath ;
     desc = recipe.description
    }
    this.recipeForm = new FormGroup({
      'recipeData': new FormGroup({
        'rname' : new FormControl(rname) ,
        'iurl' : new FormControl(iurl) ,
        'desc' : new FormControl(desc) 
      }) 
      // ,
      // 'ingredientsData' : new FormGroup({
      //   'iname' : new FormControl(null) ,
      //   'amount' : new FormControl(null) 
      // })
    });
  }

  onSubmit(){
    console.log(this.recipeForm)
  }

}
