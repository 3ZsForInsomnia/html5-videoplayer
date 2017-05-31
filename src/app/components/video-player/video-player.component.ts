import { Component, Input, Output, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as clips from './../../actions/clips.actions';
import * as playlist from './../../actions/playlist.actions';
import { UtilsService } from './../../services/utils.service';
import { IClip } from './../../models/clip';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  providers: [UtilsService]
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('videoplayer') videoplayer;
  @Input() baseVideoSource: string;
  currentlyPlaying$: Observable<string>;
  currentClip$: Observable<IClip>;
  currentClip: IClip;

  canEdit: boolean;
  startButtonText: string;
  endButtonText: string;
  saveButtonText: string;
  name: string;
  newClip: IClip = { name: '', startTime: -1, endTime: -1, tags: [] };

  constructor(private store: Store<fromRoot.State>, private utilsService: UtilsService) {
    this.currentlyPlaying$ = this.store.select(fromRoot.getCurrentlyPlaying);
    this.currentClip$ = this.store.select(fromRoot.getActiveClip);
    this.currentClip$.subscribe(clip => this.currentClip = clip);

    this.startButtonText = 'Start New Clip';
    this.endButtonText = 'End This Clip';
    this.saveButtonText = 'Save This Clip';
    this.canEdit = this.utilsService.getIsPublicView();
  }

  ngAfterViewInit() {
    let vid = this.videoplayer.nativeElement;
    this.currentlyPlaying$.subscribe(src => {
      vid.currentTime = this.utilsService.getStartTimeFromSource(src);
      setTimeout(function () {
        //vid.play();
      }, 3000);
    });
  }

  paused() {
    let vid = this.videoplayer.nativeElement;
    let endTime = this.utilsService.getEndTimeFromSource(vid.src);
    if (endTime !== -1) {
      if (Math.floor(vid.currentTime) === endTime) {
        this.store.dispatch(new clips.MoveToNextClipAction());
        let src = this.utilsService.generateSrcUrl(this.baseVideoSource, this.currentClip);
        this.store.dispatch(new playlist.ChangeCurrentlyPlayingAction(src));
      }
    }
  }

  startNewClip() {
    this.newClip.startTime = Math.floor(this.videoplayer.nativeElement.currentTime);
    this.startButtonText = 'Clip started at: ' + this.newClip.startTime;
  }

  endNewClip() {
    if (this.newClip.startTime === -1) {
      this.endButtonText = 'Start a new clip first!';
      setTimeout(() => {
        this.endButtonText = 'End This Clip';
      }, 2000);
      return;
    }
    this.newClip.endTime = Math.floor(this.videoplayer.nativeElement.currentTime);
    this.endButtonText = 'Clip ended at: ' + this.newClip.endTime;
  }

  saveNewClip() {
    if (this.newClip.startTime === -1) {
      this.saveButtonText = 'Clip must have a start time!';
      setTimeout(() => {
        this.saveButtonText = 'Save This Clip';
      }, 2000);
      return;
    }
    if (this.newClip.endTime === -1) {
      this.newClip.endTime = undefined;
    }
    this.newClip.name = this.name;
    this.store.dispatch(new clips.AddClipAction(this.newClip));
  }
}
