import { Component, Input, OnInit } from '@angular/core';
import { IClip } from './../../models/clip';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-playlist-clips',
  templateUrl: './playlist-clips.component.html',
  styleUrls: ['./playlist-clips.component.scss'],
  providers: [UtilsService]
})
export class PlaylistClipsComponent implements OnInit {
  @Input() clips: IClip[];
  @Input() baseVideoSource: string;
  canEdit: boolean;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.canEdit = this.utilsService.getIsPublicView();
  }
}
