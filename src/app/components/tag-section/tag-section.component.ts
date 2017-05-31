import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as clips from './../../actions/clips.actions';
import * as fromRoot from '../../reducers';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-tag-section',
  templateUrl: './tag-section.component.html',
  styleUrls: ['./tag-section.component.scss'],
})
export class TagSectionComponent implements OnInit {
  @Input() tags: string[];
  @Input() clipName: string;
  noTags: boolean = false;
  canEdit: boolean = false;

  constructor(private store: Store<fromRoot.State>, private utilsService: UtilsService) { }

  ngOnInit() {
    if (!this.tags || this.tags.length === 0) {
      this.noTags = true;
    }
    this.canEdit = this.utilsService.getIsPublicView();
  }

  addNewTag(tag: string) {
    this.store.dispatch(new clips.AddTagToClipAction({clipName: this.clipName, tag: tag}));
    this.noTags = false;
  }
}
