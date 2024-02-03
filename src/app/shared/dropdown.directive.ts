import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector : '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen : boolean = false ; 
    
    // constructor(private elementREF : ElementRef , private renderer : Renderer2){}
    // @HostListener('click') openDropDown (eventData :  Event){
    //     this.renderer.addClass(this.elementREF , 'open')
    // }

    @HostListener('click')openDropDown(){
        this.isOpen = !this.isOpen
    }
}