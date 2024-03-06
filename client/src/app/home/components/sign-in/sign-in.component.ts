import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {
  @Output() signUpClicked = new EventEmitter(false);
  constructor() { }

  ngOnInit() {}

  handleSignUpClicked() {
    this.signUpClicked.emit(true);
  }

}
