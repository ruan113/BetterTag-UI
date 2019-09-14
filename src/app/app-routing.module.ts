import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageViewerComponent } from './pages/image-viewer/image-viewer.component';


const routes: Routes = [
  { path: '', component: ImageViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
