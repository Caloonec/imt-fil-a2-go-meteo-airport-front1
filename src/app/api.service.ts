import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const localUrl = 'http://localhost:8180/airports/05/measures';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTestQuery(){
    return this.http.get(localUrl);
  }
}
