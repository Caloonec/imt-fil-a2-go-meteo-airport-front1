import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const localUrl = 'https://app-faf67b5c-fb44-4a59-b829-e42825258c24.cleverapps.io/airports/NTE/measures?measureType=Temp&';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTestQuery(from: string, to: string){
    if(to === ''){
      let today = new Date();
      let tomorrow =  new Date()
      tomorrow.setDate(today.getDate() + 1)
      today.setDate(today.getDate())
      from = today.toISOString().split('T')[0];
      to = tomorrow.toISOString().split('T')[0];

    }
    console.log(from);
    console.log(to);
    
    let timeRange = 'from='+from+'&to='+to

    let url = localUrl + timeRange

    console.log(timeRange);

    return this.http.get(url);
  }
}
