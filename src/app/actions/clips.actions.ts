import { Action } from '@ngrx/store';
import { IClip } from './../models/clip';

export const ADD_CLIP = '[Clip] Add Clip';
export const DELETE_CLIP = '[Clip] Delete Clip';
export const CHANGE_CLIP_NAME = '[Clip] Change Clip Name';
export const CHANGE_CLIP_TIMES = '[Clip] Change Clip Times';
export const ADD_TAG_TO_CLIP = '[Clip] Add Tag To Clip';
export const MOVE_TO_NEXT_CLIP = '[Clip] Move To Next Clip';
export const MOVE_TO_PREV_CLIP = '[Clip] Move To Prev Clip';
export const CHANGE_ACTIVE_CLIP = '[Clip] Change Active Clip';

export class AddClipAction implements Action {
    readonly type = ADD_CLIP;

    constructor(public payload: IClip) { }
}

export class DeleteClipAction implements Action {
    readonly type = DELETE_CLIP;

    constructor(public payload: string) { }
}

export class ChangeClipNameAction implements Action {
    readonly type = CHANGE_CLIP_NAME;

    constructor(public payload: {oldName: string, newName: string}) { }
}

export class ChangeClipTimesAction implements Action {
    readonly type = CHANGE_CLIP_TIMES;

    constructor(public payload: {clipName: string, startTime: number, endTime?: number}) { }
}

export class AddTagToClipAction implements Action {
    readonly type = ADD_TAG_TO_CLIP;

    constructor(public payload: {clipName: string, tag: string}) { }
}

export class NextClipAction implements Action {
    readonly type = ADD_CLIP;
}

export class PreviousClipAction implements Action {
    readonly type = ADD_CLIP;
}

export class ChangeActiveClipAction implements Action {
    readonly type = CHANGE_ACTIVE_CLIP;

    constructor(public payload: string) { }
}

export class MoveToNextClipAction implements Action {
    readonly type = MOVE_TO_NEXT_CLIP;
}

export class MoveToPreviousClipAction implements Action {
    readonly type = MOVE_TO_PREV_CLIP;
}

export type Actions
    = AddClipAction
    | DeleteClipAction
    | ChangeClipNameAction
    | ChangeClipTimesAction
    | AddTagToClipAction
    | NextClipAction
    | PreviousClipAction
    | ChangeActiveClipAction
    | MoveToNextClipAction
    | MoveToPreviousClipAction;
