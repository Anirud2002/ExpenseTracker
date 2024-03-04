import { Component, OnInit } from '@angular/core';
import { UserConfigService } from '../shared/services/user-config.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {
  isLightTheme: boolean;

  constructor(
    private userConfigService: UserConfigService
  ) { }

  ngOnInit() {
    this.subscribeToThemeChange();
  }

  subscribeToThemeChange() {
    this.userConfigService.$theme.subscribe(theme => {
      this.isLightTheme = theme === "light";
    })
  }

}
