import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService,
              library: FaIconLibrary) {
    library.addIcons(faGoogle);
  }

  ngOnInit(): void {
  }

}
