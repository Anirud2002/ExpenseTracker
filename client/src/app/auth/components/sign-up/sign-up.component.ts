import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {
  @Output() signInClicked = new EventEmitter(false);
  registerFormGroup: FormGroup;
  passwordMatched: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerFormGroup = this.fb.group({
      userName: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  formControlValid(formControlName: string) {
    const control = this.registerFormGroup.get(formControlName);

    if(!control.touched) {
      return true;
    }

    return control.valid;
  }

  markFormControlTouched(formControlName: string) {
    const control = this.registerFormGroup.get(formControlName);

    control.markAsTouched();
  }

  handleSignInClicked() {
    this.signInClicked.emit(true);
  }

}
