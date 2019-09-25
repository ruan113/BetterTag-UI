import { Component, OnInit, HostListener } from '@angular/core';
import { PhotosService } from 'src/app/services/photos/photos.service';
import { Photo } from 'src/app/models/photo/photo';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Filter } from 'src/app/models/filter/filter';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  playing = false;
  intervalLoopTime = 5000; //Em ms
  intervalInstance;

  indexSelected = 0;
  loading = false;

  playCronometroAnimation = false;
  cronoAnimationInstance;

  photos: Array<Photo> = [];
  needIframe = false;

  filter: Filter = {
    showImages: true,
    showGifs: true,
    showVideos: true
  };

  showStatusBoard = true;

  KEY_CODE = {
    RIGHT_ARROW: 39,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    SPACE_ARROW: 32
  };

  constructor(
    private photosService: PhotosService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.getPhotos().subscribe((response) => {
      this.photos = response.map((item: any) => {
        return { id: item._id, url: item.url };
      });
      this.shuffle(this.photos);
      if (!this.validateResource(this.photos[this.indexSelected].url)) {
        this.avanca();
      }
      this.needIframe = this.utilsService.checkIfNeedIframe(this.photos[this.indexSelected].url);
    });

  }

  getPhotos(): Observable<any> {
    return this.photosService.list();
  }

  removePhoto() {
    console.log('Foto removida: ', this.photos[this.indexSelected]);
    this.photos.splice(this.indexSelected, 1);
  }

  validateResource(url) {
    if (this.filter.showGifs && (this.utilsService.checkIsGif(url) || this.utilsService.checkIsGifEmbed(url))) {
      return true;
    }
    if (this.filter.showImages && this.utilsService.checkIsImage(url)) {
      return true;
    }
    if (this.filter.showVideos && this.utilsService.checkIsVideo(url)) {
      return true;
    }
    return false;
  }

  setFilterChanges(event: Filter) {
    this.filter = event;
    console.log("new Filters: ", this.filter);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.keyCode === this.KEY_CODE.RIGHT_ARROW) {
      this.avanca();
    }

    if (event.keyCode === this.KEY_CODE.LEFT_ARROW) {
      this.retorna();
    }

    if (event.keyCode === this.KEY_CODE.SPACE_ARROW) {
      this.playing = !this.playing;
      this.setTimer();
    }

    if (event.keyCode === this.KEY_CODE.UP_ARROW) {
      this.intervalLoopTime += 1000;
      console.log(this.intervalLoopTime);
      this.setTimer();
      this.toogleCronometroAnimation();
    }

    if (event.keyCode === this.KEY_CODE.DOWN_ARROW) {
      this.intervalLoopTime = (this.intervalLoopTime - 1000) > 4000 ? (this.intervalLoopTime - 1000) : 4000;
      console.log(this.intervalLoopTime);
      this.setTimer();
      this.toogleCronometroAnimation();
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
    if (!this.cronoAnimationInstance) {
      this.playCronometroAnimation = true;

      this.cronoAnimationInstance = setTimeout(() => {
        this.playCronometroAnimation = false;
        this.cronoAnimationInstance = null;
      }, 1000);
    }
  }

  setTimer() {
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
}
