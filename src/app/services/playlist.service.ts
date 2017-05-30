import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Playlist } from './../models/playlist';
import { IClip } from './../models/clip';
import { CurrentlyPlaying } from './../models/currently-playing'

@Injectable()
export class PlaylistService {
  generateSrcUrl(baseUrl: string, clip?: IClip) {
    let src = baseUrl;
    if (clip) {
      src += '#t=' + clip.startTime;
      if (clip.endTime) {
        src += ',' + clip.endTime;
      }
    }
    return src;
  }
}
