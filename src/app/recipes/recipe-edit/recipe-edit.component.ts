import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  recipeId : number ;
  allowEdit : boolean  =false;

  constructor(private route : ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params)=>{
        this.allowEdit = params['id'] !== null ? true : false ;
        this.recipeId = params['id']
      }
    )
  }

}
