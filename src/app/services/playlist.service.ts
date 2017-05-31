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

  getStartTimeFromSource(source: string): number {
    let indexOfFragment = source.indexOf('#t=');
    if(indexOfFragment > -1) {
      let substring = source.substring(indexOfFragment + 3, source.indexOf(','));
      let value = parseInt(substring);
      return value;
    }
    return 0;
  }

  getEndTimeFromSource(source: string): number {
    let indexOfFragment = source.indexOf('#t=');
    if(indexOfFragment > -1) {
      let fragmentSubString = source.substring(indexOfFragment + 3);
      let endTime = fragmentSubString.substring(fragmentSubString.indexOf(',') + 1);
      let value = parseInt(endTime);
      return value;
    }
    return -1;
  }
}
