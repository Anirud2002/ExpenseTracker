import { Injectable } from '@angular/core';
import { User } from '../../user/user-modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  async login(loginCreds: {userName: string, password: string}) {
    const request = this.http.post<User>(`${environment.apiUrl}/api/user/login`, loginCreds).pipe(
      catchError(_ => of(null))
    );

    const response = await lastValueFrom(request);

    this.user = response;
    this.userService.setUser(this.user);
    if(this.user) { // if user was logged in successfully
      this.router.navigateByUrl("/");
    }
  }

  async register(registerCreds: {userName: string, firstName: string, lastName: string, password: string}): Promise<boolean> {
    const request = this.http.post<User>(`${environment.apiUrl}/api/user/register`, registerCreds).pipe(
      catchError(_ => of(null)) // means that registration was not successfull 
    );

    const response = await lastValueFrom(request);

    return response != null; // return true if registration was successfull, else false
  }

  async logout() {
    this.userService.setUser(null);
  }
}
