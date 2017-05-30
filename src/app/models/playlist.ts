import { IClip } from './clip';

export class Playlist {
    videoUrl: string; // url to original, full length video
    name: string;
    clips: IClip[];

    constructor(videoUrl) {
        this.videoUrl = videoUrl;
        this.name = '';
        this.clips = [];
    }
}
