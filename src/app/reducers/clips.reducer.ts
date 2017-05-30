import { IClip } from './../models/clip';
import * as clips from './../actions/clips.actions';

export interface State {
  clips: IClip[];
  activeClip: IClip
};

export const initialState: State = {
  clips: [],
  activeClip: null
};

export function reducer(state = initialState, action: clips.Actions): State {
  switch (action.type) {
    case clips.ADD_CLIP:
      return {
        activeClip: state.activeClip,
        clips: [...state.clips, action['payload']]
      };
    case clips.DELETE_CLIP:
      let indexForDelete = returnIndexFromClipName(action.payload, state.clips);
      let firstHalfForDelete = state.clips.slice(0, indexForDelete);
      let secondHalfForDelete = state.clips.slice(indexForDelete + 1);
      let notDeletedClips = [].concat(firstHalfForDelete, secondHalfForDelete);
      return {
        activeClip: state.activeClip,
        clips: notDeletedClips
      };
    case clips.CHANGE_ACTIVE_CLIP:
      return {
        activeClip: state.clips[returnIndexFromClipName(action.payload, state.clips)],
        clips: state.clips
      };
    case clips.ADD_TAG_TO_CLIP:
      let indexForTags = returnIndexFromClipName(action.payload.clipName, state.clips);
      let clipsBeforeTaggedClip = state.clips.slice(0, indexForTags);
      let clipToRecieveNewTag = state.clips[indexForTags];
      let clipWithNewTag: IClip = {
        name: clipToRecieveNewTag.name,
        startTime: clipToRecieveNewTag.startTime,
        endTime: clipToRecieveNewTag.endTime,
        tags: [].concat(clipToRecieveNewTag.tags, action.payload.tag)
      }
      let clipsAfterTaggedClip = state.clips.slice(indexForTags + 1);
      let taggedClips = [].concat(clipsBeforeTaggedClip, clipWithNewTag, clipsAfterTaggedClip);
      return {
        activeClip: state.activeClip,
        clips: taggedClips
      };
    case clips.CHANGE_CLIP_NAME:
      let indexForName = returnIndexFromClipName(action.payload.oldName, state.clips);
      let clipsBeforeNameChangedClip = state.clips.slice(0, indexForName);
      let clipToRecieveNewName = state.clips[indexForName];
      let clipWithNewName: IClip = {
        name: action.payload.newName,
        startTime: clipToRecieveNewName.startTime,
        endTime: clipToRecieveNewName.endTime,
        tags: clipToRecieveNewName.tags
      }
      let clipsAfterNameChangedClip = state.clips.slice(indexForName + 1);
      let namedClips = [].concat(clipsBeforeNameChangedClip, clipWithNewName, clipsAfterNameChangedClip);
      return {
        activeClip: state.activeClip,
        clips: namedClips
      };
    case clips.CHANGE_CLIP_TIMES:
      let indexForTimes = returnIndexFromClipName(action.payload.clipName, state.clips);
      let clipsBeforeTimeChangedClip = state.clips.slice(0, indexForTimes);
      let clipToChangeTimes = state.clips[indexForTimes];
      let clipWithNewTimes: IClip = {
        name: clipToChangeTimes.name,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        tags: clipToChangeTimes.tags
      }
      let clipsAfterTimeChangedClip = state.clips.slice(indexForTimes + 1);
      let timeChangedClips = [].concat(clipsBeforeTimeChangedClip, clipWithNewTimes, clipsAfterTimeChangedClip);
      return {
        activeClip: state.activeClip,
        clips: timeChangedClips
      };
    case clips.MOVE_TO_NEXT_CLIP: // changes active clip to be next clip, or changes it to null if at end
      return state;
    case clips.MOVE_TO_PREV_CLIP: // changes active clip to be prev clip, or changes it to null if at beginning
      return state;
    default: {
      return state;
    }
  }
}

// Helper methods
function returnIndexFromClipName(clipName: string, clips: IClip[]) {
  return clips.findIndex(
    function (currentClip) {
      if (currentClip.name === clipName) {
        return true;
      }
    }
  );
}

export const getActiveClip = (state: State) => state.activeClip;
export const getAllClips = (state: State) => state.clips;
