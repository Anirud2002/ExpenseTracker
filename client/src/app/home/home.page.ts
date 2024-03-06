import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showSignInComponent: boolean = false;
  showSignUpComponent: boolean = false;

  constructor() {}

  toggleOnSignIn() {
    this.showSignInComponent = true;
    this.showSignUpComponent = false;
  }

  toggleOnSignUp() {
    this.showSignInComponent = false;
    this.showSignUpComponent = true;
  }

  showWelcomeText() {
    this.showSignInComponent = false;
    this.showSignUpComponent = false;
  }

}
