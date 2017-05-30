import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistClipsComponent } from './playlist-clips.component';

describe('PlaylistClipsComponent', () => {
  let component: PlaylistClipsComponent;
  let fixture: ComponentFixture<PlaylistClipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistClipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistClipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
