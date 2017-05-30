import { Component, Input } from '@angular/core';
import { IClip } from './../../models/clip';

@Component({
  selector: 'app-playlist-clips',
  templateUrl: './playlist-clips.component.html',
  styleUrls: ['./playlist-clips.component.scss']
})
export class PlaylistClipsComponent {
  @Input() clips: IClip[];
  @Input() baseVideoSource: string;
}
