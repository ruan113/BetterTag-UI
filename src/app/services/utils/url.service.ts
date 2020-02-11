import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() {
  }

  getEmbed(url: string) {
    const source = this.getSource(url);
    // console.log(source);
    url += '';

    if (source !== '') {
      switch (source) {
        case 'pornhub':
          return 'https://pt.pornhub.com/embed/' + url.split('viewkey=')[1];
        case 'xvideos':
          return 'https://www.xvideos.com/embedframe/' + url.split('/video')[1].split('/')[0];
        case 'gfycat':
          return 'https://gfycat.com/ifr/' + url.split('com/')[1];
        case 'redtube':
          return 'https://embed.redtube.com/?id=' + url.split('/')[3];
        case 'xhamster':
          return 'https://pt.xhamster.com/embed/' + url.split('com/')[1].split('/')[1];
      }
    }

    return url;
  }

  getSource(url: string) {
    if (url[0].indexOf('pornhub') !== -1) {
      return 'pornhub';
    }
    if (url[0].indexOf('xvideos') !== -1) {
      return 'xvideos';
    }
    if (url[0].indexOf('gfycat') !== -1) {
      return 'gfycat';
    }
    if (url[0].indexOf('redtube') !== -1) {
      return 'redtube';
    }
    if (url[0].indexOf('xhamster') !== -1) {
      return 'xhamster';
    }
    return '';
  }
}
