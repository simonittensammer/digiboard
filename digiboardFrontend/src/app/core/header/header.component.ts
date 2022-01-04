import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public httpService: HttpService,
    library: FaIconLibrary
  ) {
    library.addIcons(faGoogle);
  }

  ngOnInit(): void {
  }

}
