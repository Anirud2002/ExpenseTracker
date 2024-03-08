import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user-modal';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user$: Observable<User>;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
      this.user$ = this.userService.user$;
  }

}
