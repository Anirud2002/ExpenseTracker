import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../user/user-modal';
import { AuthService } from '../../../auth/services/auth.service';
import { ExpenseService } from '../../../expense/services/expense.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent  implements OnInit {
  @ViewChild("newYearInput") newYearInput: HTMLIonInputElement;
  user$: Observable<User>;

  years: string[] = [];

  showNewYearInput: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private expenseServices: ExpenseService
  ) { }

  ngOnInit() {
    this.user$ = this.userService.user$;
    this.user$.subscribe((user) => user && this.getYears());
  }

  async getYears() {
    this.years = await this.expenseServices.getYears();
  }

  handleLogout() {
    this.authService.logout();
  }

  toggleShowNewYearInput() {
    this.showNewYearInput = !this.showNewYearInput;
    if(this.showNewYearInput) {
      setTimeout(() => {
        this.newYearInput.setFocus();
      }, 50);
    }
  }

  async handleAddNewYear() {
    let newYear = await this.expenseServices.addYear(this.newYearInput.value + "");
    if(newYear) {
      this.years.push(newYear);
    }
  }

}
