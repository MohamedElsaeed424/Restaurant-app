import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoopingListService } from './shopping-list/services/shooping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/services/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/place-holder/place-holder.directive';
import { RecipeModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    PlaceHolderDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule , 
    ReactiveFormsModule ,
    AppRoutingModule ,
    HttpClientModule ,
    RecipeModule ,
    ShoppingListModule
  ],
  providers: [
    ShoopingListService  , 
    RecipeService ,
    {
      provide : HTTP_INTERCEPTORS ,
      useClass : AuthInterceptorService ,
      multi : true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
