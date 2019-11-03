import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Photo} from '../../models/photo/photo';
import * as Papa from 'papaparse';
import {UrlService} from '../utils/url.service';
import {UtilsService} from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {
  csvContent: string;
  parsedCsv: string[][];

  private csvReaderChange$: BehaviorSubject<Array<Photo>> = new BehaviorSubject<Array<Photo>>(null);
  csvReaderChange = this.csvReaderChange$.asObservable();
  photos: Array<Photo>;

  constructor(private urlService: UrlService, private utilService: UtilsService) {
  }

  setPhotos(photos: Array<Photo>) {
    this.photos = photos;
    console.log(photos);
    this.csvReaderChange$.next(this.photos);
  }

  onChange(files: File[]) {
    if (files[0]) {
      console.log(files[0]);
      Papa.parse(files[0], {
        skipEmptyLines: true,
        complete: (result: any, file) => {
          const array: Array<Photo> = [];
          console.log(result, file);

          result.data.forEach((element, index) => {
            const formattedUrl = this.urlService.getEmbed(element);
            array.push({
              id: index,
              url: formattedUrl,
              type: this.utilService.getContentType(formattedUrl)
            });
          });
          this.setPhotos(array);
        }
      });
    }
  }

  remove() {}

}
