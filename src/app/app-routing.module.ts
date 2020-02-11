import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageViewerComponent } from './pages/image-viewer/image-viewer.component';
import {ExplorerMenuComponent} from './pages/explorer-menu/explorer-menu.component';


const routes: Routes = [
  { path: '', redirectTo: 'explorer', pathMatch: 'full'},
  { path: 'explorer', component: ExplorerMenuComponent },
  { path: 'content/:url', component: ImageViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
