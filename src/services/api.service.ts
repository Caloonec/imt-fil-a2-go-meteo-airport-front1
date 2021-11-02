import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


const apiUrl = 'https://app-faf67b5c-fb44-4a59-b829-e42825258c24.cleverapps.io/airports/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient) { }

  getMeasures(airport: string, measureType: string, from: string, to: string) {
    console.log(from);
    console.log(from);
    
    let timeRange = 'from=' + from + '&to=' + to
    let url = apiUrl + airport + '/measures?measureType=' + measureType + '&' + timeRange
    return this.http.get(url);
  }

  getAverageMeasures(airport: string, day: string) {
    //TODO
    let url = '';
    return this.http.get(url)
  }
}
