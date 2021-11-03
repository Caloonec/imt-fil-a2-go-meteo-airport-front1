import { Component } from '@angular/core';
import { MeasureList } from 'src/models/MeasureList'
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  listTemp: MeasureList = [];
  listWind: MeasureList = [];
  listPress: MeasureList = [];
  listAverage: {} = {};
  airport = '';

  displayAvg: boolean = true;
  constructor(public dataService: DataService) {}

  startDate = new Date();
  endDate = new Date();
  avgDate = new Date();

  ngOnInit() {
    this.displayAvg = true;
    this.refreshAll();
  }

  refreshAll(){
    this.getMeasures();
    this.getAverageMeasures();
  }

  getMeasures() {
    let stringFrom = this.startDate.toISOString();
    let stringTo = this.endDate.toISOString();

    this.dataService.getMeasures(this.airport, 'Temp', stringFrom, stringTo)
      .then(measures => this.listTemp = measures)
      .catch(e => this.listTemp = []);
    this.dataService.getMeasures(this.airport, 'Press', stringFrom, stringTo)
      .then(measures => this.listWind = measures)
      .catch(e => this.listWind = []);
    this.dataService.getMeasures(this.airport, 'Wind', stringFrom, stringTo)
      .then(measures => this.listPress = measures)
      .catch(e => this.listPress = []);
  }

  getAverageMeasures() {
    let stringDate = this.avgDate.toISOString().split('T')[0];
    this.dataService.getAverageMeasures(this.airport, stringDate)
      .then(averages => this.listAverage = averages)
      .catch(e => this.listAverage = []);
  }

  getMeasureList(measureType: string): MeasureList {
    return this.dataService.getMeasureList(measureType);
  }

  getMeasureAverage(): {} {
    return this.dataService.getMeasureAverage();
  }
}
