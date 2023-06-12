import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

var headers = new HttpHeaders()

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getParams(queryParams?: Record<string, any>) {
    let params = new HttpParams();
    if (queryParams) {
      for (let key in queryParams) {
        params.set(key, queryParams[key]);
      }
    }
    return params;
  }

  get(url: string, queryParams?: Record<string, any>) {
    // return this.http.get(`${this.appConfigService.apiBaseUrl}${url}`, {
      return this.http.get(`${url}`, {
      headers,
      params: this.getParams(queryParams),
    });
  }
}
