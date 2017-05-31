import * as playlist from './../actions/playlist.actions';

export interface State {
    name: string;
    baseVideoSrc: string;
    currentlyPlaying: string;
};

export const initialState: State = {
  name: 'Default Playlist',
  baseVideoSrc: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4',
  currentlyPlaying: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4',
};

export function reducer(state = initialState, action: playlist.Actions): State {
  switch (action.type) {
    case playlist.CHANGE_PLAYLIST_NAME:
        return {
            name: action.payload,
            baseVideoSrc: state.baseVideoSrc,
            currentlyPlaying: state.currentlyPlaying
        };
    case playlist.CHANGE_BASE_SRC:
        // Calling this basically resets everything. No point keeping the same name/clips.
        return {
            name: initialState.name,
            baseVideoSrc: action.payload,
            currentlyPlaying: action.payload
        };
    case playlist.CHANGE_CURRENTLY_PLAYING:
        return {
            name: state.name,
            baseVideoSrc: state.baseVideoSrc,
            currentlyPlaying: action.payload
        };
    default: {
      return state;
    }
  }
}

export const getPlaylistName = (state: State) => state.name;
export const getBaseVideoSource = (state: State) => state.baseVideoSrc;
export const getCurrentlyPlaying = (state: State) => state.currentlyPlaying;
