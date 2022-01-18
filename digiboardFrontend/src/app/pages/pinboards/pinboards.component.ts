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
  private newX: number;
  private newY: number;
  private preventSelection = false;
  newPinboardName: string;

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
    if (!this.preventSelection) {
      this.selectedNote = note;
      console.log(this.selectedNote.id);
    } else {
      this.preventSelection = false;
    }
  }

  deselectNote(): void {
    if (this.selectedNote != null) {
      this.updateNote(this.selectedNote);
      this.selectedNote = null;
    }
  }

  updateNote(note: Note): void {
    console.log('Update Note ' + note?.id);
    this.httpService.updateNote(note).subscribe(data => {
      this.httpService.getNotesByPinboardId(this.pinboard.id).subscribe(data2 => {
        this.pinboard.notes = data2;
      });
    });
  }

  onDragEnded(event, draggedNote): void {
    const element = event.source.getRootElement();
    const boundingClientRect = element.getBoundingClientRect();
    const parentPosition = this.getPosition(element);

    this.newX = (boundingClientRect.x - parentPosition.left);
    this.newY = (boundingClientRect.y - parentPosition.top);
    console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));
    draggedNote.posX = this.newX;
    draggedNote.posY = this.newY;

    this.updateNote(draggedNote);
    this.preventSelection = true;
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

  createPinboard(): void {
    const newPinboard = new Pinboard(this.newPinboardName);
    this.httpService.createPinboard(newPinboard).subscribe(data => {
      this.httpService.getPinboardsByUserId(this.httpService.user.uid).subscribe(data2 => {
        this.httpService.user.pinboards = data2;
        this.pinboard = data;
        this.newPinboardName = '';
      });
    });
  }
}
