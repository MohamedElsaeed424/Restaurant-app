import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule } from '@angular/common/http';
import { RecipeModule } from './recipes/modules/recipes.module';
import { ShoppingListModule } from './shopping-list/modules/shopping-list.module';
import { SharedModule } from './shared/modules/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/modules/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule ,
    AppRoutingModule ,
    HttpClientModule ,
    RecipeModule ,
    ShoppingListModule ,
    SharedModule ,
    CoreModule ,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
