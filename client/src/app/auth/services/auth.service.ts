import { Injectable } from '@angular/core';
import { User } from '../../user/user-modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, lastValueFrom, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async login(loginCreds: {userName: string, password: string}) {
    const request = this.http.post<User>(`${environment.apiUrl}/api/user/login`, loginCreds).pipe(
      catchError(_ => of(null))
    );

    const response = await lastValueFrom(request);

    this.user = response;
    
    if(this.user) { // if user was logged in successfully
      this.router.navigateByUrl("/");
    }
  }
}
