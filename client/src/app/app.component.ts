import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UserConfigService } from './shared/services/user-config.service';
import { UserService } from './user/user.service';
import { User } from './user/user-modal';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: User;
  isLightTheme: boolean;
  constructor(
    private platform: Platform,
    private userService: UserService,
    private userConfigService: UserConfigService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.userService.initializeUserOnAppInit();
    await this.userConfigService.applyThemeOnInit();
    this.isLightTheme = await this.userConfigService.getTheme() === "light";
  }

  async toggleTheme() {
    if(this.isLightTheme) { // if current theme is light, change to dark
      await this.userConfigService.applyTheme("dark");
      this.isLightTheme = false;
    } else { // if current theme is dark, change to light
      await this.userConfigService.applyTheme("light");
      this.isLightTheme = true;
    }
  }

}
