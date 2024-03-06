import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {
  @Output() signUpClicked = new EventEmitter(false);

  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginFormGroup = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  formControlValid(formControlName: string) {
    const control = this.loginFormGroup.get(formControlName);

    if(!control.touched) {
      return true;
    }

    return control.valid;
  }

  markFormControlTouched(formControlName: string) {
    const control = this.loginFormGroup.get(formControlName);

    control.markAsTouched();
  }

  handleSignUpClicked() {
    this.signUpClicked.emit(true);
  }

}
