import {Component, OnInit} from '@angular/core';
import {Photo} from '../../models/photo/photo';
import {takeUntil} from 'rxjs/operators';
import {CsvReaderService} from '../../services/csv-reader/csv-reader.service';
import {Subject} from 'rxjs';
import {UtilsService} from '../../services/utils/utils.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-explorer-menu',
  templateUrl: './explorer-menu.component.html',
  styleUrls: ['./explorer-menu.component.scss']
})
export class ExplorerMenuComponent implements OnInit {
  private onDestroy$ = new Subject();

  photos: Array<Photo> = [];
  contentToShow: Array<Photo> = [];

  constructor(
    private csvReaderService: CsvReaderService,
    public utilsService: UtilsService,
    public router: Router,
  ) {
    this.csvReaderService.photosChange.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: Array<Photo>) => {
        this.photos = response;
        if (this.photos !== null) {
          for (let i = 0; i < 12; i++) {
            this.contentToShow.push(this.photos[i]);
          }
        }
        // console.log(this.contentToShow);
      }
    });
  }

  ngOnInit() {
    // console.log(this.csvReaderService.photos);
    this.photos = undefined;
  }

  goToContentViewer(url) {
    this.router.navigate(['content', url]);
  }

  removePhoto(index) {
    console.log('Foto removida: ', this.photos[index]);
    this.photos.splice(index, 1);
  }
}
