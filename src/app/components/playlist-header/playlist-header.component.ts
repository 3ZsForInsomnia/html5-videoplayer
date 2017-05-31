import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.scss'],
  providers: [UtilsService]
})
export class PlaylistHeaderComponent implements OnInit {
  @Input() name: string;
  @Input() baseVideoSource: string;  
  @Output() nameChanged = new EventEmitter<string>();
  @Output() playOriginalVideo = new EventEmitter<string>();
  isEditingPlaylistName: boolean = false;
  canEdit: boolean;

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.canEdit = this.utilsService.getIsPublicView();
  }

  playVideo() {
    this.playOriginalVideo.emit(this.utilsService.generateSrcUrl(this.baseVideoSource));
  }

  editPlaylistName() {
    this.isEditingPlaylistName = true;
  }

  savePlaylistName() {
    this.isEditingPlaylistName = false;
    this.nameChanged.emit(this.name);
  }
}
