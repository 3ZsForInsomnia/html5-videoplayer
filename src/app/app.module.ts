import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';

import { reducer } from './reducers';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { ClipComponent } from './components/clip/clip.component';
import { VideoSourceComponent } from './components/video-source/video-source.component';
import { VideoSectionComponent } from './components/video-section/video-section.component';
import { PlaylistHeaderComponent } from './components/playlist-header/playlist-header.component';
import { PlaylistClipsComponent } from './components/playlist-clips/playlist-clips.component';
import { TagComponent } from './components/tag/tag.component';
import { ClipNewComponent } from './components/clip-new/clip-new.component';
import { TagSectionComponent } from './components/tag-section/tag-section.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    PlaylistComponent,
    ClipComponent,
    VideoSourceComponent,
    VideoSectionComponent,
    PlaylistHeaderComponent,
    PlaylistClipsComponent,
    TagComponent,
    ClipNewComponent,
    TagSectionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
