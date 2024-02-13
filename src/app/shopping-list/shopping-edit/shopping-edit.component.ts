import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoopingListService } from '../services/shooping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  @ViewChild('f' , {static : true}) slForm : NgForm ;
  editeditemIndex : number  ;
  editedItem : Ingredient ;
  editSubs : Subscription ;
  editingMode : boolean  =false;

  constructor(private shoppingListService : ShoopingListService){}

  ngOnInit(): void {
    this.editSubs = this.shoppingListService.itemEditIndex.subscribe(
      (itemSlIndex : number)=>{
        this.editingMode = true ;
        this.editeditemIndex = itemSlIndex ; 
        this.editedItem = this.shoppingListService.getIngredient(this.editeditemIndex);
        this.slForm.setValue({
          name : this.editedItem.name  ,
          amount :this.editedItem.amount 
        }) ;
      }
    )
  }

  onSubmit(){
    if (this.editingMode){
        this.shoppingListService.editIngredient(this.editeditemIndex ,
          this.slForm.value.name  ,
          this.slForm.value.amount
          )
    }else{
      const newIngredient = new Ingredient(
        this.slForm.value.name ,
        this.slForm.value.amount
      )
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editingMode = false ;
    this.slForm.reset() ;
  }
  onCancle(){
    this.slForm.reset() ;
    this.editingMode = false ;
  }

  onDelete(){
    this.onCancle() ;
    this.shoppingListService.deleteIngredient(this.editeditemIndex) ;

  }
  ngOnDestroy(): void {
    this.editSubs.unsubscribe() ;
  }

}
