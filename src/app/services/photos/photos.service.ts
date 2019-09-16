import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService extends ApiService {

  // photosSubject = new BehaviorSubject(null);
  // photos = this.photosSubject.asObservable();

  constructor(http: HttpClient) {
    super(http, 'photos')
  }

  list(): Observable<any> {
    return super.get();
  }

}
