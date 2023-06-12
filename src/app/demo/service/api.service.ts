import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { AppConfigService } from './app-config.service'

const headers = new HttpHeaders()
// const headers = new HttpHeaders().set('Accept', 'application/json');
@Injectable({
  providedIn: 'root',
})
export class ApiService {
    apiBaseUrl:string="http://10.12.20.203:3000"

    constructor(private http: HttpClient) {

  }



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
    return this.http.get(`${this.apiBaseUrl}${url}`, {
      headers,
      params: this.getParams(queryParams),
    });
  }


  // getEndpointNadin(id:string){
  //   return `${this.apiBaseUrl2}${id}${this.appConfigService.postfixBaseUrl2}`
  // }


  getById(url: string, id: string, queryParams?: Record<string, any>) {
    return this.http.get(`${this.apiBaseUrl}${url}/${id}`, {
      headers,
      params: this.getParams(queryParams),
    });
  }

  post(url: string, queryParams?: Record<string, any>) {
    return this.http.post(
      `${this.apiBaseUrl}${url}`,
      {},
      { headers, params: this.getParams(queryParams) }
    );
  }

  getJson(
    url: string,
    body: any,
    method: string = 'get',
    queryParams?: Record<string, any>
  ) {
    return this.http.get(`${this.apiBaseUrl}${url}`, body);
  }

  getFile(url:string,body:any, isChecked:boolean,queryParams?: Record<string, any>,) {
    if (!isChecked) {
    return this.http.post(`${this.apiBaseUrl}${url}`,
      body,
      {headers,
      responseType:'blob',
      observe: 'response'}
    );
    }
    else{
        return this.getFileAll(url)
    }
  }

  getFileAll(url:string, queryParams?: Record<string, any>) {
    return this.http.get(`${this.apiBaseUrl}${url}/all`,
      {headers,
      responseType:'blob',
      observe: 'response'}
    );
  }

  postJson(
    url: string,
    body: any,
    method: string = 'post',
    queryParams?: Record<string, any>
  ) {
    return this.http.post(`${this.apiBaseUrl}${url}`, body, {
      headers,
      params: this.getParams(queryParams),
    });
  }

  postFormData(url: string, body: FormData, queryParams?: Record<string, any>) {
    return this.http.post(`${this.apiBaseUrl}${url}`, body, {
      params: this.getParams(queryParams),
    });
  }

  destroy(url: string) {
    return this.http.delete(`${this.apiBaseUrl}${url}`);
  }

  delete(url: string, body: any, queryParams?: Record<string, any>,header?: any) {
    var option= {
     header:new HttpHeaders(header),body:body
    }
    return this.http.delete(`${this.apiBaseUrl}${url}`, option);
  }
}
