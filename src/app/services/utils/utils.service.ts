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

  checkIsVideo(url: string) {
    if (url.indexOf('pornhub') !== -1) {
      return true;
    }
    if (url.indexOf('xvideos') !== -1) {
      return true;
    }
    if (url.indexOf('gfycat') !== -1) {
      return true;
    }
    return false;
  }

}
