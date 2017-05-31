import { IClip } from './../models/clip';
import * as clips from './../actions/clips.actions';
import * as playlist from './../actions/playlist.actions';

export interface State {
  clips: IClip[];
  activeClip: IClip
};

export const initialState: State = {
  clips: [],
  activeClip: null
};

export function reducer(state = initialState, action: clips.Actions | playlist.Actions): State {
  switch (action.type) {
    case clips.ADD_CLIP:
      return {
        activeClip: state.activeClip,
        clips: [...state.clips, action['payload']]
      };
    case clips.DELETE_CLIP:
      let notDeletedClips = returnNewArrayWithModifiedItem(action.payload, {}, state.clips);
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
      let clipToRecieveNewTag = state.clips[indexForTags];
      let clipWithNewTag = {
        tags: [].concat(clipToRecieveNewTag.tags, action.payload.tag)
      }
      let taggedClips = returnNewArrayWithModifiedItem(action.payload.clipName, clipWithNewTag, state.clips);
      return {
        activeClip: state.activeClip,
        clips: taggedClips
      };
    case clips.CHANGE_CLIP_NAME:
      let clipWithNewName = {
        name: action.payload.newName,
      }
      let nameChangedClips = returnNewArrayWithModifiedItem(action.payload.oldName, clipWithNewName, state.clips);
      return {
        activeClip: state.activeClip,
        clips: nameChangedClips
      };
    case clips.CHANGE_CLIP_TIMES:
      let clipWithNewTimes = {
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
      }
      let timeChangedClips = returnNewArrayWithModifiedItem(action.payload.clipName, clipWithNewTimes, state.clips);
      return {
        activeClip: state.activeClip,
        clips: timeChangedClips
      };
    case clips.MOVE_TO_NEXT_CLIP:
      let activeClipNext: IClip;
      if (!state.activeClip) {
        activeClipNext = state.clips[0];
      } else {
        activeClipNext = state.activeClip;
      }
      let indexForNext = returnIndexFromClipName(activeClipNext.name, state.clips);
      if (indexForNext === state.clips.length - 1) {
        return state;
      }
      return {
        clips: state.clips,
        activeClip: state.clips[indexForNext + 1]
      };
    case clips.MOVE_TO_PREV_CLIP:
      let activeClipPrev: IClip;
      if (!state.activeClip) {
        activeClipPrev = state.clips[state.clips.length - 1];
      } else {
        activeClipPrev = state.activeClip;
      }
      let index = returnIndexFromClipName(activeClipPrev.name, state.clips);
      if (index === 0) {
        return state;
      }
      return {
        clips: state.clips,
        activeClip: state.clips[index - 1]
      };
    case playlist.CHANGE_BASE_SRC: // used to nuke current state if we load a different base URL
      return initialState;
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

function returnNewArrayWithModifiedItem(clipNameToChange: string, newObj: any, array: IClip[]) {
  // get the index of the clip getting replaced
  let oldClipIndex = returnIndexFromClipName(clipNameToChange, array);

  // get the clip to be replaced so we can access its properties
  let oldClip = array[oldClipIndex];

  // get section of array before oldClip
  let arrayBeforeChangedClip = array.slice(0, oldClipIndex);

  // get section of array after oldClip
  let arrayAfterChangedClip = array.slice(oldClipIndex + 1);

  // if we recieved an empty object, it means we are deleting the object
  // in that case, we simply return the sections of the array without the clip
  if (Object.keys(newObj).length === 0 && newObj.constructor === Object) {
    return [].concat(arrayBeforeChangedClip, arrayAfterChangedClip);
  }

  // create a new clip object using oldClip and overriding its properties with the new properties given in newObj
  let newClip: IClip = Object.assign({}, oldClip, newObj);

  // return a totally new array consisting of the above
  return [].concat(arrayBeforeChangedClip, newClip, arrayAfterChangedClip);
}

export const getActiveClip = (state: State) => state.activeClip;
export const getAllClips = (state: State) => state.clips;
