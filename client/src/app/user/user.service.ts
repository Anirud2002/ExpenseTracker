import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user-modal';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);
  user$ = this._user.asObservable();

  constructor() { }

  async initializeUserOnAppInit() {
    this.user = await this.getUserFromLocalStorage(); // try to get the user from local storage
    this.setUser(this.user);
  }

  async setUser(user: User) {
    this.user = user;
    this._user.next(this.user);
    this.setUserToLocalStorage(this.user);
  }

  async setUserToLocalStorage(user: User) {
    await Preferences.set({
      key: "user",
      value: JSON.stringify(user)
    })
  }

  async getUserFromLocalStorage() {
    this.user = JSON.parse((await Preferences.get({key: "user"})).value) as User;
    return this.user;
  }

  getUser() : User{
    return this.user;
  }
}
