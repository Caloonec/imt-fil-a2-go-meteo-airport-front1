import { Component } from '@angular/core';
import { MeasureList } from 'src/models/measureList';
import { DataService } from '../services/data.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listTemp = this.dataService.getMeasureList('Temp');
  listWind = this.dataService.getMeasureList('Wind');
  listPress = this.dataService.getMeasureList('Press');

  constructor(
    public dataService: DataService,
    // public listTemp : MeasureList,
    // public listWind : MeasureList,
    // public listPress : MeasureList
  ) {}

  //TODO REMOVE THIS


  startDate = new Date();
  endDate = new Date();

  ngOnInit() {
    this.getMeasures();
  }

  getMeasures() : void {
    let stringFrom = this.startDate.toISOString();
    let stringTo = this.endDate.toISOString();
    this.dataService.getMeasures('NTE','Temp', stringFrom, stringTo);
    this.dataService.getMeasures('NTE','Press', stringFrom, stringTo);
    this.dataService.getMeasures('NTE','Wind', stringFrom, stringTo);

    //TODO REMOVE THIS
    this.listTemp = _.clone(this.dataService.getMeasureList('Temp'));
    this.listWind = _.clone(this.dataService.getMeasureList('Wind'));
    this.listPress = _.clone(this.dataService.getMeasureList('Press'));
  }

  getMeasureList(measureType: string) : MeasureList{
    return this.dataService.getMeasureList(measureType);
  }
}
