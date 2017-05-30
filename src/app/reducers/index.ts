import { ActionReducer } from '@ngrx/store';
import { createSelector } from 'reselect';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromClips from './clips.reducer';
import * as fromPlaylist from './playlist.reducer';

export interface State {
    clips: fromClips.State;
    playlist: fromPlaylist.State;
}

const reducers = {
    clips: fromClips.reducer,
    playlist: fromPlaylist.reducer,
};

export const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

export const getClipsState = (state: State) => state.clips;
export const getActiveClip = createSelector(getClipsState, fromClips.getActiveClip);
export const getAllClips = createSelector(getClipsState, fromClips.getAllClips);

export const getPlaylistState = (state: State) => state.playlist;
export const getPlaylistName = createSelector(getPlaylistState, fromPlaylist.getPlaylistName);
export const getBaseVideoSource = createSelector(getPlaylistState, fromPlaylist.getBaseVideoSource);
export const getCurrentlyPlaying = createSelector(getPlaylistState, fromPlaylist.getCurrentlyPlaying);
