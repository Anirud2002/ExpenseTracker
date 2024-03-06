import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {
  @Output() signInClicked = new EventEmitter(false);
  constructor() { }

  ngOnInit() {}

  handleSignInClicked() {
    this.signInClicked.emit(true);
  }

}
