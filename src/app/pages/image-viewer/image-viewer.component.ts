import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/services/photos/photos.service';
import { map, timeoutWith } from 'rxjs/operators';
import { Photo } from 'src/app/models/photo/photo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  playing = false;
  indexSelected = 0;
  loading = false;

  photos: Array<Photo> = [];

  constructor(
    private photosService: PhotosService
  ) { }

  ngOnInit() {
    this.getPhotos().subscribe((response) => {
      this.photos = response.map((item: any) => {
        return { id: item._id, url: item.url };
      });
      this.shuffle(this.photos);
    });
  }

  getPhotos(): Observable<any> {
    return this.photosService.list();
  }

  avanca() {
    this.loading = true;
    setTimeout(() => {
      if ((this.indexSelected + 1) !== this.photos.length) {
        this.indexSelected++;
      } else {
        this.indexSelected = 0;
      }
      console.log(this.indexSelected, this.photos[this.indexSelected])
    }, 500);
  }

  retorna() {
    setTimeout(() => {
      if ((this.indexSelected - 1) >= 0) {
        this.indexSelected--;
      } else {
        this.indexSelected = this.photos.length - 1;
      }
      console.log(this.indexSelected)
    }, 500);
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
