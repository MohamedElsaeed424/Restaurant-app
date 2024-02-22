import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule } from '@angular/common/http';
import { RecipeModule } from './recipes/modules/recipes.module';
import { ShoppingListModule } from './shopping-list/modules/shopping-list.module';
import { AuthModule } from './auth/modules/auth.module';
import { SharedModule } from './shared/modules/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule ,
    AppRoutingModule ,
    HttpClientModule ,
    // RecipeModule ,   Lazy loading
    // ShoppingListModule , Lazy loading
    // AuthModule , Lazy loading
    SharedModule ,
    CoreModule ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
