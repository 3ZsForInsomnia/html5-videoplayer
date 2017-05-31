import { Component, Input, Output, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as clips from './../../actions/clips.actions';
import * as playlist from './../../actions/playlist.actions';
import { PlaylistService } from './../../services/playlist.service';
import { IClip } from './../../models/clip';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  providers: [PlaylistService]
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('videoplayer') videoplayer;
  @Input() baseVideoSource: string;
  currentlyPlaying$: Observable<string>;
  currentClip$: Observable<IClip>;
  currentClip: IClip;

  constructor(private store: Store<fromRoot.State>, private playlistService: PlaylistService) {
    this.currentlyPlaying$ = this.store.select(fromRoot.getCurrentlyPlaying);
    this.currentClip$ = this.store.select(fromRoot.getActiveClip);
    this.currentClip$.subscribe(clip => this.currentClip = clip);
  }

  ngAfterViewInit() {
    let vid = this.videoplayer.nativeElement;
    this.currentlyPlaying$.subscribe(src => {
      vid.currentTime = this.playlistService.getStartTimeFromSource(src);
      setTimeout(function () {
        vid.play();
      }, 3000);
    });
  }

  paused() {
    let vid = this.videoplayer.nativeElement;
    let endTime = this.playlistService.getEndTimeFromSource(vid.src);
    if (endTime !== -1) {
      if (Math.floor(vid.currentTime) === endTime) {
        this.store.dispatch(new clips.MoveToNextClipAction());
        let src = this.playlistService.generateSrcUrl(this.baseVideoSource, this.currentClip);
        this.store.dispatch(new playlist.ChangeCurrentlyPlayingAction(src));
      }
    }
  }
}
