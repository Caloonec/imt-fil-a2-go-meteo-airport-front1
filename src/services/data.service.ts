import { Injectable } from '@angular/core';
import { MeasureAverage } from 'src/models/MeasureAverage';
import { MeasureList } from 'src/models/MeasureList';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  measureMap = new Map<string, MeasureList>();
  measureAverage : MeasureAverage = []

  constructor(public apiService: ApiService) {}

  getMeasures(airport: string, measureType: string, from: string, to: string): Promise<MeasureList> {
    return this.apiService.getMeasures(airport, measureType, from, to)
      .toPromise()
      .then(data => {
        let parsedData: { timestamp: string, value: number }[] = JSON.parse(JSON.stringify(data));
        let formattedData: MeasureList = parsedData.map(element => ({ x: element.timestamp, y: element.value }));

        this.measureMap.set(measureType, formattedData);
        
        return formattedData;
      })
      .catch((error) => {
        console.log('An error accessing apiService', error);
        throw error;
      });
  }

  getAverageMeasures(airport: string, date: string): Promise<MeasureAverage> {
    return this.apiService.getAverageMeasures(airport, date)
    .toPromise()
    .then(data => {
      let parsedData: { _id: string, average: number }[] = JSON.parse(JSON.stringify(data));
      this.measureAverage = parsedData.map(element => ({ measureType: element._id, value: element.average }));
      console.log(this.measureAverage);
      return this.measureAverage;
    })
    .catch((error) => {
      console.log('An error accessing apiService', error);
      throw error;
    });
  }

  getMeasureList(measureType: string) : MeasureList{
    return this.measureMap.get(measureType) || [];
  }

  getMeasureAverage() : MeasureAverage{
    return this.measureAverage
  }

}