import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as playlist from './../../actions/playlist.actions';
import * as clips from './../../actions/clips.actions';
import * as fromRoot from '../../reducers';
import { IClip } from './../../models/clip';
import { PlaylistService } from './../../services/playlist.service';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  providers: [PlaylistService]
})
export class ClipComponent implements OnInit {
  @Input() clip: IClip;
  @Input() baseVideoSource: string;
  isEditingClipName: boolean = false;
  isEditingClipTimes: boolean = false;
  areTagsVisible: boolean = false;

  defaultClipTimesSubmitText: string = 'Save';
  errorClipTimesSubmitText: string = 'Failed!';
  successClipTimesSubmitText: string = 'Success!';
  submitClipTimesButtonText: string = this.defaultClipTimesSubmitText;
  invalidClipTimes: boolean = false;

  startTime: number;
  endTime: number;

  constructor(private store: Store<fromRoot.State>, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.startTime = this.clip.startTime;
    this.endTime = this.clip.endTime;
  }

  playClip() {
    let src = this.playlistService.generateSrcUrl(this.baseVideoSource, this.clip);
    this.store.dispatch(new playlist.ChangeCurrentlyPlayingAction(src));
    this.store.dispatch(new clips.ChangeActiveClipAction(this.clip.name));
  }

  editClipName() {
    this.isEditingClipName = true;
  }

  editClipTimes() {
    this.isEditingClipTimes = true;
  }

  saveClipTimes(startTime, endTime) {
    if (endTime) {
      if (startTime > endTime) {
        this.invalidClipTimes = true;
        this.submitClipTimesButtonText = this.errorClipTimesSubmitText;
        setTimeout(() => {
          this.submitClipTimesButtonText = this.defaultClipTimesSubmitText;
        }, 3000);
        return;
      }
    }
    this.invalidClipTimes = false;
    if (endTime) {
      this.store.dispatch(new clips.ChangeClipTimesAction({clipName: this.clip.name, startTime: startTime, endTime: endTime}));
    } else {
      this.store.dispatch(new clips.ChangeClipTimesAction({clipName: this.clip.name, startTime: startTime}));
    }
    this.submitClipTimesButtonText = this.successClipTimesSubmitText;
    setTimeout(() => {
      this.submitClipTimesButtonText = this.defaultClipTimesSubmitText;
      this.isEditingClipTimes = false;
    }, 1000);
  }

  saveClipName(name) {
    this.isEditingClipName = false;
    this.store.dispatch(new clips.ChangeClipNameAction({oldName: this.clip.name, newName: name}));
  }

  deleteClip() {
    this.store.dispatch(new clips.DeleteClipAction(this.clip.name));
  }

  toggleTagsVisibility() {
    this.areTagsVisible = !this.areTagsVisible;
  }
}
