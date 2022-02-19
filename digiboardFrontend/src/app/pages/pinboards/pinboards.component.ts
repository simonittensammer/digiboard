import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {Pinboard} from '../../models/pinboard';
import {Note} from '../../models/note';
import {MatDialog} from "@angular/material/dialog";
import {DeletePinboardDialogComponent} from "../../core/delete-pinboard-dialog/delete-pinboard-dialog.component";

@Component({
  selector: 'app-pinboards',
  templateUrl: './pinboards.component.html',
  styleUrls: ['./pinboards.component.scss']
})
export class PinboardsComponent implements OnInit {

  public currentPinboard: Pinboard;
  public selectedNote: Note;
  private newX: number;
  private newY: number;
  private preventSelection = false;
  newPinboardName: string;
  updateHeadline = '';
  updateText = '';
  updatePriority = 0;

  constructor(
    private auth: AuthService,
    public httpService: HttpService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.auth.userObservable.subscribe(data => {
      if (data) {
        this.httpService.login(data).subscribe(data2 => {
          this.httpService.getPinboardsByUserId(data2.uid).subscribe(data3 => {
            data2.pinboards = data3;
            this.httpService.user = data2;
            if (data3.length === 0) {
              this.createPinboard('My Pinboard');
            }
            this.selectPinboard(this.httpService.user.pinboards[0]);
          });
        });
      }
    });
  }

  selectPinboard(selectedPinboard): void {
    this.currentPinboard = selectedPinboard;
    this.httpService.getNotesByPinboardId(this.currentPinboard.id).subscribe(data => {
      this.currentPinboard.notes = data;
    });
  }

  selectNote(note: Note): void {
    if (!this.preventSelection) {
      this.selectedNote = note;
      console.log('Select Note ' + this.selectedNote.id);
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
    if (this.updateHeadline !== '') {
      note.headline = this.updateHeadline;
    }

    if (this.updateText !== '') {
      note.text = this.updateText;
    }

    if (this.updatePriority !== 0) {
      note.priority = this.updatePriority;
    }

    this.httpService.updateNote(note).subscribe(data => {
      this.httpService.getNotesByPinboardId(this.currentPinboard.id).subscribe(data2 => {
        this.currentPinboard.notes = data2;
        this.updateHeadline = '';
        this.updateText = '';
        this.updatePriority = 0;
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

  createPinboard(newPinboardName: string): void {
    const newPinboard = new Pinboard(newPinboardName);
    this.httpService.createPinboard(newPinboard).subscribe(data => {
      this.httpService.getPinboardsByUserId(this.httpService.user.uid).subscribe(data2 => {
        this.httpService.user.pinboards = data2;
        this.selectPinboard(this.httpService.user.pinboards[this.httpService.user.pinboards.length - 1]);
        this.createNote(
          newPinboardName,
          'Welcome to your new Pinboard!',
          window.innerWidth / 100 * 42.5,
          window.innerHeight / 4,
          0
        );
        this.newPinboardName = '';
      });
    });
  }

  createNoteByEvent(event): void {
    this.createNote('', '', event.clientX, event.clientY, 0);
  }

  createNote(headline: string, text: string, posX: number, posY: number, priority: number): void {
    const newNote = new Note(
      headline,
      text,
      posX,
      posY,
      priority
    );

    this.httpService.addNote(this.currentPinboard.id, newNote).subscribe(data1 => {
      this.httpService.getNotesByPinboardId(this.currentPinboard.id).subscribe(data2 => {
        this.currentPinboard.notes = data2;
      });
    });
  }

  setUpdateHeadline(event): void {
    this.updateHeadline = event.target.value;
  }
  setUpdateText(event): void {
    this.updateText = event.target.value;
  }

  setPriority(priority: number): void {
    this.updatePriority = priority;
    this.deselectNote();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeletePinboardDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePinboard(id);
      }
    });
  }

  deleteNote(id: number): void {
    this.httpService.deleteNote(this.currentPinboard.id, id).subscribe(data => {
      this.httpService.getNotesByPinboardId(this.currentPinboard.id).subscribe(data2 => {
        this.currentPinboard.notes = data2;
      });
    });
  }

  deletePinboard(id: number): void {
    this.httpService.deletePinboard(this.httpService.user.uid, id).subscribe(data => {
      this.httpService.getPinboardsByUserId(this.httpService.user.uid).subscribe(data2 => {
        this.httpService.user.pinboards = data2;
        if (data2.length === 0) {
          this.createPinboard('My Pinboard');
        }
        this.selectPinboard(this.httpService.user.pinboards[0]);
      });
    });
  }
}
