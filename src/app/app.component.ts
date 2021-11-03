import { Component } from '@angular/core';
import { MeasureAverage } from 'src/models/MeasureAverage';
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
  displayAvg: boolean = false;
  constructor(public dataService: DataService) {}

  startDate = new Date();
  endDate = new Date();
  avgDate = new Date();

  ngOnInit() {
    this.displayAvg = false;
    this.getMeasures();
  }

  getMeasures() {
    let stringFrom = this.startDate.toISOString();
    let stringTo = this.endDate.toISOString();

    this.dataService.getMeasures('NTE', 'Temp', stringFrom, stringTo)
      .then(measures => this.listTemp = measures)
      .catch(e => this.listTemp = []);
    this.dataService.getMeasures('NTE', 'Press', stringFrom, stringTo)
      .then(measures => this.listWind = measures)
      .catch(e => this.listWind = []);
    this.dataService.getMeasures('NTE', 'Wind', stringFrom, stringTo)
      .then(measures => this.listPress = measures)
      .catch(e => this.listPress = []);
  }

  getAverageMeasures() {
    let stringDate = this.avgDate.toISOString();
    this.dataService.getAverageMeasures('NTE', stringDate)
      .then()
  }

  getMeasureList(measureType: string): MeasureList {
    return this.dataService.getMeasureList(measureType);
  }

  getMeasureAverage(): MeasureAverage {
    return this.dataService.getMeasureAverage();
  }
}
