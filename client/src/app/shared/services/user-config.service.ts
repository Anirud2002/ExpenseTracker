import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  theme: string = "";
  private _theme: BehaviorSubject<string> = new BehaviorSubject("");
  $theme: Observable<string> = this._theme.asObservable();
  
  constructor(
  ) { }

  async applyThemeOnInit(){
    this.theme = (await Preferences.get({key: "theme"})).value;
    if(!this.theme || this.theme === "system"){
      await this.applyTheme("system")
    }else{
      await this.applyTheme(this.theme as "dark" | "light" | "system");
    }
  }

  async applyTheme(theme: "dark" | "light" | "system"){
    switch(theme){
      case "light":
        document.body.setAttribute("color-theme", "light");
        this._theme.next("light");
        break;
      case "dark":
        document.body.setAttribute("color-theme", "dark");
        this._theme.next("dark");
        break;
      case "system":
        // need to set the theme local storage to whatever the user's system pref theme is
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(prefersDark){
          await this.applyTheme("dark");
        }else{
          await this.applyTheme("light")
        }
        break;
    }
    this.setThemeToLocalStorage(theme);
  }

  async getTheme(): Promise<string>{
    const theme = await Preferences.get({key: "theme"});
    return theme.value;
  }

  async setThemeToLocalStorage(theme: "dark" | "light" | "system"){
    await Preferences.set({
      key: "theme",
      value: theme
    })
  }
}
