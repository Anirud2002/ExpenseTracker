import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../user/user-modal';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent  implements OnInit {
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.userService.user$;
  }

  handleLogout() {
    this.authService.logout();
  }

}
