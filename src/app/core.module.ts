import { NgModule } from "@angular/core";
import { ShoopingListService } from "./shopping-list/services/shooping-list.service";
import { RecipeService } from "./recipes/services/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/services/auth-interceptor.service";

@NgModule({
    providers: [
        ShoopingListService  , 
        RecipeService ,
        {
          provide : HTTP_INTERCEPTORS ,
          useClass : AuthInterceptorService ,
          multi : true 
        }
    ]
})


export class CoreModule {}