import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public user: User;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(data => {
      this.user = data;
    });
  }

}
