import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-pinboards',
  templateUrl: './pinboards.component.html',
  styleUrls: ['./pinboards.component.scss']
})
export class PinboardsComponent implements OnInit {

  constructor(
    private auth: AuthService,
    public httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.auth.userObservable.subscribe(data => {
      if (data) {
        this.httpService.login(data).subscribe(data2 => {
          this.httpService.getPinboards(data2.uid).subscribe(data3 => {
            data2.pinboards = data3;
            this.httpService.user = data2;
            console.log(this.httpService.user);
          });
        });
      }
    });
  }

}
