import { Injectable } from '@angular/core';
import { MeasureList } from 'src/models/measureList';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  measureMap: Map<string, MeasureList> = new Map([
    ['Temp', new MeasureList([], [], 'Temp', 'rgba(255,0,0,0.3)', 'Temperature')],
    ['Wind',new MeasureList([], [], 'Wind', 'rgba(0,255,0,0.3)', 'Wind')],
    ['Press', new MeasureList([], [], 'Press', 'rgba(0,0,255,0.3)', 'Pressure')]]
  );

  constructor(public apiService: ApiService) { }

  getMeasures(airport:string, measureType:string, from:string, to:string): void {

    this.apiService.getMeasures(airport, measureType, from, to).subscribe((data) => {

      this.measureMap.get(measureType)!.values = [];
      this.measureMap.get(measureType)!.labels = [];

      let set = new Set();
      let dataObj = JSON.parse(JSON.stringify(data));

      for (let index = 0; index < dataObj.length; index++) {
        this.measureMap.get(measureType)!.values.push(dataObj[index].value);
        let day = dataObj[index].timestamp.split('T')[0];
        this.measureMap.get(measureType)!.labels.push(day);
        
        // if (!set.has(day)) {
        //   this.measureMap.get(measureType)!.labels.push(day);
        //   set.add(day);
        // } else {
        //   this.measureMap.get(measureType)!.labels.push('');
        // }
      }
      
    }, (error) => {
      console.log("An error accessing apiService");
      console.log(error)
    })

  }

  getMeasureList(measureType: string) : MeasureList{
    return this.measureMap.get(measureType)!;
  }
  }
