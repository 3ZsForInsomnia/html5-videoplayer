import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from './../../services/playlist.service';

@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.scss'],
  providers: [PlaylistService]
})
export class PlaylistHeaderComponent {
  @Input() name: string;
  @Input() baseVideoSource: string;  
  @Output() nameChanged = new EventEmitter<string>();
  @Output() playOriginalVideo = new EventEmitter<string>();
  isEditingPlaylistName: boolean = false;

  constructor(private playlistService: PlaylistService) {}

  playVideo() {
    this.playOriginalVideo.emit(this.playlistService.generateSrcUrl(this.baseVideoSource));
  }

  editPlaylistName() {
    this.isEditingPlaylistName = true;
  }

  savePlaylistName() {
    this.isEditingPlaylistName = false;
    this.nameChanged.emit(this.name);
  }
}
