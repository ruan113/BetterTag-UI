import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImageViewerComponent } from './pages/image-viewer/image-viewer.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PhotosService } from './services/photos/photos.service';
import { ApiService } from './services/api/api.service';
import { SafePipe } from './pipes/safe-pipe';
import { ContentFilterComponent } from './components/content-filter/content-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageViewerComponent,
    HeaderComponent,
    FooterComponent,
    SafePipe,
    ContentFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PhotosService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
