import { Injectable } from '@angular/core';
import { User } from '../../user/user-modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(
    private http: HttpClient
  ) { }

  async login(loginCreds: {userName: string, password: string}) {
    const request = this.http.post<User>(`${environment}/api/user/login`, loginCreds).pipe(
      catchError(_ => of(null))
    );

    const response = await lastValueFrom(request);

    this.user = response;
  }
}
