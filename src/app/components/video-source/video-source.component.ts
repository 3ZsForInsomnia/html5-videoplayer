import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-source',
  templateUrl: './video-source.component.html',
  styleUrls: ['./video-source.component.scss'],
})
export class VideoSourceComponent {
  @Input() baseVideo: string;
  @Output() loadEvent = new EventEmitter<string>();
  
  load() {
    this.loadEvent.emit(this.baseVideo);
  }
}
