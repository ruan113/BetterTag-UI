import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected apiEndPoint: string = environment.apiUrl;
  protected resource: string;
  protected httpclient: HttpClient;

  constructor(protected http: HttpClient, resource: string) {
    this.resource = resource;
    this.httpclient = http;
  }

  getHeaders() {
    return new HttpHeaders(
      {
        // 'Content-Type': 'application/json',
        'Accept-Language': 'pt-BR',
        'Accept': '*/*'
      });
  }

  get(params?: any) {
    return this.httpclient.get(this.apiEndPoint + '/' + this.resource, {
      headers: this.getHeaders()
    });
  }
}