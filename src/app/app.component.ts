import { Component ,Input, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // currentPage : string  = 'recipes';
  // onSelectedPage(pageSelected : string){
  //   this.currentPage =pageSelected ;
  // }
  constructor(private authService : AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin()
  }

}
