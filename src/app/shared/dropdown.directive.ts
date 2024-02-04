import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector : '[appDropdown]'
})

// export class DropdownDirective {
//     @HostBinding('class.open') isOpen : boolean = false ; 
    
//     // constructor(private elementREF : ElementRef , private renderer : Renderer2){}
//     // @HostListener('click') openDropDown (eventData :  Event){
//     //     this.renderer.addClass(this.elementREF , 'open')
//     // }

//     @HostListener('click')openDropDown(){
//         this.isOpen = !this.isOpen
//     }
// }

// To make the drop down closed when written on any place on the page 
export class DropdownDirective {
    constructor(private elRef: ElementRef) {}
    
    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) openDropDown(event: Event) {
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    
  }