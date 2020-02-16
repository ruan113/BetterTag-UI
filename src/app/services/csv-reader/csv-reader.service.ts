import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Photo} from '../../models/photo/photo';
import * as Papa from 'papaparse';
import {UrlService} from '../utils/url.service';
import {UtilsService} from '../utils/utils.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {
  csvContent: string;
  parsedCsv: string[][];

  private csvReaderChange$: BehaviorSubject<File> = new BehaviorSubject<File>(null);
  csvReaderChange = this.csvReaderChange$.asObservable();

  private photosChange$: BehaviorSubject<Array<Photo>> = new BehaviorSubject<Array<Photo>>(null);
  photosChange = this.photosChange$.asObservable();
  photos: Array<Photo>;

  constructor(
    private urlService: UrlService,
    private utilService: UtilsService,
    private http: HttpClient) {
    this.getPhotosFromSource();}

  setPhotos(photos?: Array<Photo>) {
    this.photos = photos;
    this.utilService.shuffle(this.photos);
    // console.log(photos);
    this.photosChange$.next(this.photos);
  }

  getPhotosFromSource() {
    // @ts-ignore
    this.http.get('/assets/likes.csv', {responseType: 'application/vnd.ms-excel'})
      .subscribe(data => this.onChange([data]));
  }

  onChange(files: File[]) {
    if (files[0]) {
      // console.log(files[0]);
      Papa.parse(files[0], {
        skipEmptyLines: true,
        complete: (result: any, file) => {
          const array: Array<Photo> = [];
          // console.log(result, file);
          result.data.forEach((element, index) => {
            const formattedUrl = this.urlService.getEmbed(element);
            array.push({
              id: index,
              url: formattedUrl,
              type: this.utilService.getContentType(formattedUrl),
              needIframe: this.utilService.checkIfNeedIframe(formattedUrl)
            });
          });
          this.setPhotos(array);
          this.csvReaderChange$.next(files[0]);
        }
      });
    }
  }

  remove() {
  }
}
