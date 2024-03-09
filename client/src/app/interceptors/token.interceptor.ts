import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, take, throwError } from 'rxjs';
import { User } from '../user/user-modal';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    this.userService.user$.pipe(take(1)).subscribe(user => currentUser = user);

    if(currentUser){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch(error.status){
          case 401: // unauthorized
            this.router.navigateByUrl("login");
            this.toastService.createErrorToast("Unauthorized!");
            break;
          case 500: // backend error
            this.toastService.createErrorToast("Something went wrong!");
            break;
          default:
            this.toastService.createErrorToast(error.error.message);
            break;
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
