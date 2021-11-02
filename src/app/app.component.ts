import { Component } from '@angular/core';
import { MeasureList } from 'src/models/MeasureList';
import { DataService } from '../services/data.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  listTemp: MeasureList = [];
  listWind: MeasureList = [];
  listPress: MeasureList = [];

  constructor(public dataService: DataService) {}

  startDate = new Date();
  endDate = new Date();

  ngOnInit() {
    this.getMeasures();
  }

  getMeasures() {
    let stringFrom = this.startDate.toISOString();
    let stringTo = this.endDate.toISOString();

    this.dataService.getMeasures('NTE', 'Temp', stringFrom, stringTo)
      .then(measures => this.listTemp = measures);
    this.dataService.getMeasures('NTE', 'Press', stringFrom, stringTo)
      .then(measures => this.listWind = measures);
    this.dataService.getMeasures('NTE', 'Wind', stringFrom, stringTo)
      .then(measures => this.listPress = measures);
  }

  getMeasureList(measureType: string): MeasureList {
    return this.dataService.getMeasureList(measureType);
  }

}
