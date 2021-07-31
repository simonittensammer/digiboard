import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinboardsComponent } from './pinboards.component';

describe('PinboardsComponent', () => {
  let component: PinboardsComponent;
  let fixture: ComponentFixture<PinboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
