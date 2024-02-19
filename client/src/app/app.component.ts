import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UserConfigService } from './shared/services/user-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLightTheme: boolean;
  constructor(
    private platform: Platform,
    private userConfigService: UserConfigService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.userConfigService.applyThemeOnInit();
    this.isLightTheme = await this.userConfigService.getTheme() === "light";
  }

  async switchTheme(theme: "dark" | "light" | "system") {
    await this.userConfigService.applyTheme(theme);
    this.isLightTheme = !this.isLightTheme;
  }

}
