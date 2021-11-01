import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const localUrl = 'https://app-faf67b5c-fb44-4a59-b829-e42825258c24.cleverapps.io/airports/NTE/measures?measureType=Press&from=1945-02-25&to=2022-02-25';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTestQuery(){
    return this.http.get(localUrl);
  }
}
