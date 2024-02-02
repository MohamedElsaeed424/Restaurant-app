import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput' , {static : true}) newName : ElementRef;
  @ViewChild('amountInput' , {static : true}) newAmount : ElementRef ;
  @Output() addItem  = new EventEmitter<Ingredient>();

  onAddNewItem(){
    const newIngredient = new Ingredient(this.newName.nativeElement.value , this.newAmount.nativeElement.value)
    this.addItem.emit(newIngredient) ;
  }
}
