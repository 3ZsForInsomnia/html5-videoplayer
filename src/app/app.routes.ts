import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideoViewComponent } from './pages/video-view/video-view.component';

export const AppRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'public', component: VideoViewComponent },
    { path: 'privileged', component: VideoViewComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
