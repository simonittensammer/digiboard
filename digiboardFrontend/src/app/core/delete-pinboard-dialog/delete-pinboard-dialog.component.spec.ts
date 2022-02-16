import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePinboardDialogComponent } from './delete-pinboard-dialog.component';

describe('DeletePinboardDialogComponent', () => {
  let component: DeletePinboardDialogComponent;
  let fixture: ComponentFixture<DeletePinboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePinboardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePinboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
