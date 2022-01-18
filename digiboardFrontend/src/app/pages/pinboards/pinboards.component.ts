import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {Pinboard} from '../../models/pinboard';
import {Note} from '../../models/note';

@Component({
  selector: 'app-pinboards',
  templateUrl: './pinboards.component.html',
  styleUrls: ['./pinboards.component.scss']
})
export class PinboardsComponent implements OnInit {

  public pinboard: Pinboard;
  public selectedNote: Note;

  constructor(
    private auth: AuthService,
    public httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.auth.userObservable.subscribe(data => {
      if (data) {
        this.httpService.login(data).subscribe(data2 => {
          this.httpService.getPinboardsByUserId(data2.uid).subscribe(data3 => {
            data2.pinboards = data3;
            this.httpService.user = data2;
            this.selectPinboard(this.httpService.user.pinboards[0]);
          });
        });
      }
    });
  }

  selectPinboard(selectedPinboard): void {
    this.pinboard = selectedPinboard;
    this.httpService.getNotesByPinboardId(this.pinboard.id).subscribe(data => {
      this.pinboard.notes = data;
    });
  }

  selectNote(note: Note): void {
    this.selectedNote = note;
    console.log(this.selectedNote.id);
  }

  // deselectNote(): void {
  //   this.updateNote(this.selectedNote);
  //   this.selectedNote = null;
  // }

  updateNote(note: Note): void {
    console.log('Update Note ' + note?.id);
    this.httpService.updateNote(this.selectedNote).subscribe(data => {
      this.httpService.getNotesByPinboardId(this.pinboard.id).subscribe(data2 => {
        this.pinboard.notes = data2;
      });
    });
  }

  onDragEnded(event): void {
    const element = event.source.getRootElement();
    const boundingClientRect = element.getBoundingClientRect();
    const parentPosition = this.getPosition(element);
    console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));
    this.selectedNote.posX = (boundingClientRect.x - parentPosition.left);
    this.selectedNote.posY = (boundingClientRect.y - parentPosition.top);
    this.updateNote(this.selectedNote);
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {top: y, left: x};
  }
}
