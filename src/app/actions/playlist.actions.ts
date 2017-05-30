import { Action } from '@ngrx/store';
import { IClip } from './../models/clip';

export const CHANGE_PLAYLIST_NAME = '[Playlist] Change Playlist Name';
export const CHANGE_BASE_SRC = '[Playlist] Change Playlist Base Source';
export const CHANGE_CURRENTLY_PLAYING = '[Playlist] Change Currently Playing';

export class ChangePlaylistNameAction implements Action {
    readonly type = CHANGE_PLAYLIST_NAME;

    constructor(public payload: string) { }
}

export class ChangeBaseSourceAction implements Action {
    readonly type = CHANGE_BASE_SRC;

    constructor(public payload: string) { }
}

export class ChangeCurrentlyPlayingAction implements Action {
    readonly type = CHANGE_CURRENTLY_PLAYING;

    constructor(public payload: string) { }
}

export type Actions
    = ChangePlaylistNameAction
    | ChangeBaseSourceAction
    | ChangeCurrentlyPlayingAction;
