import { Component, OnInit } from '@angular/core';
import { UserConfigService } from '../shared/services/user-config.service';
import { ActivatedRoute } from '@angular/router';
import { Expense } from './interfaces/expense-modal';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {
  isLightTheme: boolean;
  year: string;
  month: string;

  expense: Expense;

  constructor(
    private userConfigService: UserConfigService,
    private expenseService: ExpenseService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscribeToThemeChange();
    this.getRouteParams();
    this.getExpense();
  }

  async getExpense() {
    this.expense = await this.expenseService.getExpenses(this.year, this.month);
    console.log(this.expense);
  }

  getRouteParams() {
    const{ month, year} = this.actRoute.snapshot.params;
    this.month = month;
    this.year = year;
  }

  subscribeToThemeChange() {
    this.userConfigService.$theme.subscribe(theme => {
      this.isLightTheme = theme === "light";
    })
  }

}
