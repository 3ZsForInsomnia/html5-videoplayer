import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as playlist from './../../actions/playlist.actions';
import * as fromRoot from '../../reducers';
import { IClip } from './../../models/clip';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  baseVideoSource$: Observable<string>;
  playlistName$: Observable<string>;
  clips$: Observable<IClip[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.baseVideoSource$ = this.store.select(fromRoot.getBaseVideoSource);
    this.playlistName$ = this.store.select(fromRoot.getPlaylistName);
    this.clips$ = this.store.select(fromRoot.getAllClips);
  }

  playlistNameChange($event) {
    this.store.dispatch(new playlist.ChangePlaylistNameAction($event));
  }

  playOriginalVideo($event) {
    this.store.dispatch(new playlist.ChangeCurrentlyPlayingAction($event));
  }
}
