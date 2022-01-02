import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(
    public auth: AuthService,
    library: FaIconLibrary
  ) {
    library.addIcons(faGoogle);
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(data => {
      this.user = data;
      console.log(this.user)
    });
  }

}
