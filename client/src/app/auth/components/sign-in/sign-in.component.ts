import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {
  @Output() signUpClicked = new EventEmitter(false);

  loginFormGroup: FormGroup;

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleSignUpClicked() {
    this.signUpClicked.emit(true);
  }

  async handleLogin() {
    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    await this.authService.login(this.loginFormGroup.value);
  }

}
