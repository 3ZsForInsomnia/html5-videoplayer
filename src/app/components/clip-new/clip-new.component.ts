import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as clips from './../../actions/clips.actions';
import * as fromRoot from '../../reducers';
import { IClip } from './../../models/clip';

@Component({
  selector: 'app-clip-new',
  templateUrl: './clip-new.component.html',
  styleUrls: ['./clip-new.component.scss'],
})
export class ClipNewComponent {
  clip: IClip = {
    name: 'Clip Name',
    startTime: 0,
    endTime: 0,
    tags: []
  };
  noTags: boolean = true;
  invalidValues: boolean = false;

  defaultText = 'Add Clip';
  errorText = 'Invalid Start/End Times!';
  successText = 'Successfully Created New Clip!';
  submitButtonText = this.defaultText;

  constructor(private store: Store<fromRoot.State>) { }

  addNewTag(tag) {
    this.clip.tags.push(tag);
    this.noTags = false;
  }

  createNewClip() {
    if (this.clip.endTime) {
      if (this.clip.startTime > this.clip.endTime) {
        this.invalidValues = true;
        this.submitButtonText = this.errorText;
        setTimeout(() => {
          this.submitButtonText = this.defaultText;
        }, 3000);
        return;
      }
    }
    this.invalidValues = false;
    this.store.dispatch(new clips.AddClipAction(this.clip));
    this.submitButtonText = this.successText;
    setTimeout(() => {
      this.submitButtonText = this.defaultText;
    }, 3000);
    this.resetNewClipForm();
  }

  resetNewClipForm() {
    this.clip = {
      name: 'Clip Name',
      startTime: 0,
      tags: []
    }
  }
}
