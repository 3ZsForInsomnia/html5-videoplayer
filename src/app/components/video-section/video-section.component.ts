import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as playlist from './../../actions/playlist.actions';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.scss']
})
export class VideoSectionComponent {
  currentlyPlaying$: Observable<string>;
  baseVideoSource$: Observable<string>

  constructor(private store: Store<fromRoot.State>) {
    this.currentlyPlaying$ = this.store.select(fromRoot.getCurrentlyPlaying);
    this.baseVideoSource$ = this.store.select(fromRoot.getBaseVideoSource);
  }

  loadNewUrl($event) {
    this.store.dispatch(new playlist.ChangeBaseSourceAction($event));
    this.store.dispatch(new playlist.ChangeCurrentlyPlayingAction($event));
  }
}
