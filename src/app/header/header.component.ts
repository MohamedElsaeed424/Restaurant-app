import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit , OnDestroy {
  @Output() pageSelected = new EventEmitter<string>();
  userSubsc : Subscription ;
  isAuthentcatedUser : boolean = false ;

  constructor(  
    private dataStorageService : DataStorageService , 
    private authService : AuthService 
  ){} 
  ngOnInit(): void {
    this.userSubsc = this.authService.authUser.subscribe((user : User)=>{
      this.isAuthentcatedUser = !!user ;
    })
  }
  // onSelect(page : string){
  //   this.pageSelected.emit(page)
  // }

  onSaveRecipes(){
    this.dataStorageService.postRecipes() ;
  }

  onFetchRecipes(){
    this.dataStorageService.getRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();

  }

  ngOnDestroy(): void {
    this.userSubsc.unsubscribe();
  }
}
