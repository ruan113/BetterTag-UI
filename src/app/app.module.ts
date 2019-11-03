import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ImageViewerComponent} from './pages/image-viewer/image-viewer.component';
import {PhotosService} from './services/photos/photos.service';
import {ApiService} from './services/api/api.service';
import {SafePipe} from './pipes/safe-pipe';
import {ComponentsModule} from './components/components.module';
import {CsvReaderService} from './services/csv-reader/csv-reader.service';
import {UrlService} from './services/utils/url.service';
import {UtilsService} from './services/utils/utils.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageViewerComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    PhotosService,
    ApiService,
    CsvReaderService,
    UrlService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
