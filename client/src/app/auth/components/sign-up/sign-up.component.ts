import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
    private fb: FormBuilder,
    private authService: AuthService
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

  checkPasswordMatched(e: CustomEvent) {
    const{value} = e.detail;
    const control = this.registerFormGroup.get("password");
    this.passwordMatched = control.value === value;
  }

  async handleRegister() {
    if(this.registerFormGroup.invalid || !this.passwordMatched) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }

    const response = await this.authService.register(this.registerFormGroup.value);
    if(response) {
      this.handleSignInClicked();
    }
  }

}
