import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 @Output() pageSelected = new EventEmitter<string>();

 constructor(private dataStorageService : DataStorageService){} 

  // onSelect(page : string){
  //   this.pageSelected.emit(page)
  // }

  onSaveRecipes(){
    this.dataStorageService.postRecipes() ;
  }

  onFetchRecipes(){
    this.dataStorageService.getRecipes().subscribe();
  }
}
