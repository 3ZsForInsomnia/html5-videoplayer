import { Component } from '@angular/core';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent {
  isPlaylistSectionCollapsed: boolean = false;

  toggleCollapse() {
    this.isPlaylistSectionCollapsed = !this.isPlaylistSectionCollapsed;
  }
}
