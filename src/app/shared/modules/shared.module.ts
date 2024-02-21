import { NgModule } from "@angular/core";
import { DropdownDirective } from "../dropdown.directive";
import { PlaceHolderDirective } from "../place-holder/place-holder.directive";
import { AlertComponent } from "../alert/alert.component";
import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@NgModule({
    declarations :[
        DropdownDirective , 
        PlaceHolderDirective ,
        AlertComponent ,
        LoadingSpinnerComponent
    ], 
    imports:[
        CommonModule
    ],
    exports:[
        CommonModule ,
        DropdownDirective , 
        PlaceHolderDirective ,
        AlertComponent ,
        LoadingSpinnerComponent
    ]
})

export class SharedModule {}