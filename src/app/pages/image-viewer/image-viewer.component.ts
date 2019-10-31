import {Component, OnInit, HostListener, EventEmitter, Output, OnDestroy, Inject} from '@angular/core';
import {PhotosService} from 'src/app/services/photos/photos.service';
import {Photo} from 'src/app/models/photo/photo';
import {Observable, Subject} from 'rxjs';
import {UtilsService} from 'src/app/services/utils/utils.service';
import {Filter} from 'src/app/models/filter/filter';
import {takeUntil} from 'rxjs/operators';
import {CsvReaderService} from '../../services/csv-reader/csv-reader.service';


enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  SPACE_ARROW = 32
}

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();

  playing = false;
  intervalLoopTime = 5000; // Em ms
  intervalInstance;

  indexSelected = 0;
  loading = false;

  showCronometroAnimation = false;
  cronometroAnimationInstance = null;

  photos: Array<Photo> = [];
  needIframe = false;

  filter: Filter;

  @Output() fullScreenMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  showStatusBoard = false;

  constructor(
    private photosService: PhotosService,
    private utilsService: UtilsService,
    private csvReaderService: CsvReaderService
  ) {
    this.utilsService.filtersChange.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: Filter) => {
        this.filter = response;
      }
    });

    this.csvReaderService.csvReaderChange.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: Array<Photo>) => {
        this.photos = response;
        if (this.photos !== null) {
          this.shuffle(this.photos);
          if (!this.validateResource(this.photos[this.indexSelected].url)) {
            this.avanca();
          }
          this.needIframe = this.utilsService.checkIfNeedIframe(this.photos[this.indexSelected].url);
        }
      }
    });
  }

  ngOnInit() {
    this.filter = new Filter();
    this.photos = [];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  removePhoto() {
    console.log('Foto removida: ', this.photos[this.indexSelected]);
    this.photos.splice(this.indexSelected, 1);
  }

  validateResource(url) {
    if (this.filter.onlyShow.showGifs && (this.utilsService.checkIsGif(url) || this.utilsService.checkIsGifEmbed(url))) {
      return true;
    }
    if (this.filter.onlyShow.showImages && this.utilsService.checkIsImage(url)) {
      return true;
    }
    if (this.filter.onlyShow.showVideos && this.utilsService.checkIsVideo(url)) {
      return true;
    }
    return false;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.avanca();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.retorna();
    }

    if (event.keyCode === KEY_CODE.SPACE_ARROW) {
      this.playing = !this.playing;
      this.setTimer();
    }

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.intervalLoopTime += 1000;
      console.log(this.intervalLoopTime);
      this.setTimer();
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.intervalLoopTime = (this.intervalLoopTime - 1000) > 4000 ? (this.intervalLoopTime - 1000) : 4000;
      console.log(this.intervalLoopTime);
      this.setTimer();
    }
  }

  avanca() {
    this.loading = true;
    if ((this.indexSelected + 1) !== this.photos.length) {
      this.indexSelected++;
    } else {
      this.indexSelected = 0;
    }
    if (this.validateResource(this.photos[this.indexSelected].url)) {
      this.needIframe = this.utilsService.checkIfNeedIframe(this.photos[this.indexSelected].url);
    } else {
      this.avanca();
    }
    console.log(this.photos[this.indexSelected]);
  }

  retorna() {
    this.loading = true;
    if ((this.indexSelected - 1) >= 0) {
      this.indexSelected--;
    } else {
      this.indexSelected = this.photos.length - 1;
    }
    console.log(this.photos[this.indexSelected].url);
    if (this.validateResource(this.photos[this.indexSelected].url)) {
      this.needIframe = this.utilsService.checkIfNeedIframe(this.photos[this.indexSelected].url);
    } else {
      this.retorna();
    }
  }

  play() {
    this.playing = !this.playing;
    this.setTimer();
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  toogleCronometroAnimation() {
    if (!this.showCronometroAnimation) {
      this.showCronometroAnimation = true;

      this.cronometroAnimationInstance = setTimeout(() => {
        this.showCronometroAnimation = false;
        this.cronometroAnimationInstance = null;
      }, 1000);
    } else {
      if (this.cronometroAnimationInstance) {
        clearTimeout(this.cronometroAnimationInstance);
        this.cronometroAnimationInstance = null;

        this.cronometroAnimationInstance = setTimeout(() => {
          this.showCronometroAnimation = false;
          this.cronometroAnimationInstance = null;
        }, 1000);
      }
    }
  }

  setTimer() {
    this.toogleCronometroAnimation(); // Timer cronometro

    // Timer auto avançar
    if (this.playing) {
      if (this.intervalInstance) {
        clearTimeout(this.intervalInstance);
      }
      this.intervalInstance = setTimeout(() => {
        this.avanca();
        this.intervalInstance = null;
      }, this.intervalLoopTime);

    } else {
      if (this.intervalInstance) {
        clearTimeout(this.intervalInstance);
        this.intervalInstance = null;
      }
    }
  }

  checkIfIsImage(url): boolean {
    return this.utilsService.checkIsImage(url);
  }
}
