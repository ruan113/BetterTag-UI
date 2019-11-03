import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ImageViewerComponent} from './pages/image-viewer/image-viewer.component';
import {SafePipe} from './pipes/safe-pipe';
import {ComponentsModule} from './components/components.module';
import {CsvReaderService} from './services/csv-reader/csv-reader.service';
import {UrlService} from './services/utils/url.service';
import {UtilsService} from './services/utils/utils.service';
import {WindowService} from './services/utils/window.service';

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
    CsvReaderService,
    UrlService,
    UtilsService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
