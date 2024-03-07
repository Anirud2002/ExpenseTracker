import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  showSignInComponent: boolean = true;
  showSignUpComponent: boolean = false;

  constructor() {}

  ngOnInit(): void {
      
  }

  toggleOnSignIn() {
    this.showSignInComponent = true;
    this.showSignUpComponent = false;
  }

  toggleOnSignUp() {
    this.showSignInComponent = false;
    this.showSignUpComponent = true;
  }

}
