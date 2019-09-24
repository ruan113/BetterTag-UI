import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  httpclient;

  constructor(http: HttpClient) {
    this.httpclient = http;
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
    if (url.indexOf('jpg') !== -1) {
      return true;
    }
    if (url.indexOf('png') !== -1) {
      return true;
    }
    return false;
  }


}
