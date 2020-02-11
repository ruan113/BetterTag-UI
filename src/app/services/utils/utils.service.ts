import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Tipos} from '../../models/photo/photo';
import {takeUntil} from 'rxjs/operators';
import {Filter} from '../../models/filter/filter';
import {FilterService} from '../filter/filter.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private onDestroy$ = new Subject();

  httpclient;

  filter: Filter;

  constructor(
    http: HttpClient,
    private filterService: FilterService,
  ) {
    this.httpclient = http;

    this.filterService.filtersChange.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: Filter) => {
        this.filter = response;
      }
    });
  }

  getUrl(url: string): Observable<any> {
    return this.httpclient.get(url, {
      params: {
        method: 'JSONP'
      }
    });
  }

  checkIfNeedIframe(url: string) {
    if (this.checkIsVideo(url) || this.checkIsGifEmbed(url)) {
      return true;
    }
    return false;
  }

  checkIsVideo(url: string) {
    if (url.indexOf('pornhub') !== -1) {
      return true;
    }
    if (url.indexOf('xvideos') !== -1) {
      return true;
    }
    if (url.indexOf('redtube') !== -1) {
      return true;
    }
    if (url.indexOf('xhamster') !== -1) {
      return true;
    }
    return false;
  }

  checkIsGifEmbed(url: string) {
    if (url.indexOf('gfycat') !== -1) {
      return true;
    }
    return false;
  }

  checkIsGif(url: string) {
    if (url.indexOf('gif') !== -1) {
      return true;
    }
    return false;
  }


  checkIsImage(url: string) {
    if ((url.indexOf('jpg') || url.indexOf('jpeg')) !== -1) {
      return true;
    }
    if (url.indexOf('png') !== -1) {
      return true;
    }
    return false;
  }

  getContentType(url: string): Tipos {
    if (this.checkIsImage(url)) {
      return (url.indexOf('jpg') || url.indexOf('jpeg'))  ? Tipos.JPG : Tipos.PNG;
    } else {
      if (this.checkIsGif(url) || this.checkIsGifEmbed(url)) {
        return Tipos.GIF;
      } else {
        if (this.checkIsVideo(url)) {
          return Tipos.VIDEO;
        }
      }
    }
  }

  validateResource(url) {
    if (this.filter.onlyShow.showGifs && (this.checkIsGif(url) || this.checkIsGifEmbed(url))) {
      return true;
    }
    if (this.filter.onlyShow.showImages && this.checkIsImage(url)) {
      return true;
    }
    if (this.filter.onlyShow.showVideos && this.checkIsVideo(url)) {
      return true;
    }
    return false;
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

}
