import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  currentlyPlaying$: Observable<string>;
  
  constructor(private store: Store<fromRoot.State>) {
    this.currentlyPlaying$ = this.store.select(fromRoot.getCurrentlyPlaying);
  }

}
