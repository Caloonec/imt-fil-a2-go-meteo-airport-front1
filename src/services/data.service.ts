import { Injectable } from '@angular/core';
import { MeasureList } from 'src/models/MeasureList';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  measureMap = new Map<string, MeasureList>();

  constructor(public apiService: ApiService) {}

  getMeasures(airport: string, measureType: string, from: string, to: string): Promise<MeasureList> {
    return this.apiService.getMeasures(airport, measureType, from, to)
      .toPromise()
      .then(data => {
        let parsedData: { timestamp: string, value: number }[] = JSON.parse(JSON.stringify(data));
        let formattedData: MeasureList = parsedData.map(element => ({
          x: new Date(element.timestamp),
          y: element.value,
        }));

        this.measureMap.set(measureType, formattedData);
        
        return formattedData;
      })
      .catch((error) => {
        console.log('An error accessing apiService', error);
        throw error;
      });
  }

  getMeasureList(measureType: string) : MeasureList{
    return this.measureMap.get(measureType) || [];
  }

}