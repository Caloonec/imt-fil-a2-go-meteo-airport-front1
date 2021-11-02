import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MeasureList } from 'src/models/measureList';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})


export class LineChartComponent implements OnChanges {
  @Input() toto !: string;
  @Input() data!: MeasureList;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any, xAxes: any } ) = {
    responsive: true,
    annotation: true,
    xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM D', // This is the default
            },
          },
        },
      ]
  };
  public lineChartColors: Color[] = [];
  
  public lineChartLegend = true;
  public lineChartType: ChartType ='line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnChanges(){
    this.refreshData();
  }

  refreshData(){
    this.lineChartData = [{data: this.data.values, label: this.data.title}];
    this.lineChartLabels = this.data.labels
    this.lineChartColors = [{borderColor:'black', backgroundColor:this.data.color}]
    console.log(this.data);
  }
}
