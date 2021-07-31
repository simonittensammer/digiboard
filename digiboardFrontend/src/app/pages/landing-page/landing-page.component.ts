import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

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
