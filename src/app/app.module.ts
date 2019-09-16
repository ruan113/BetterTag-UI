import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ImageViewerComponent } from './pages/image-viewer/image-viewer.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PhotosService } from './services/photos/photos.service';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageViewerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PhotosService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
