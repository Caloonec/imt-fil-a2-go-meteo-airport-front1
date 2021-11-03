import {Component, Input, OnChanges} from '@angular/core';
import {MeasureList} from "../../models/MeasureList";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {

  @Input() measureType!: string;
  @Input() measures!: MeasureList;

  public barChartData: ChartDataSets[] = [];
  public barChartLabels: Label[] = [];
  public barChartOptions: (ChartOptions & { annotation: any } ) = {
    responsive: true,
    annotation: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'minute',
            displayFormats: {
              minute: 'MMM D H:M:S', // This is the default
            },
          },
        },
      ],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
  };
  public barChartColors: Color[] = [];

  public barChartLegend = true;
  public barChartType: ChartType ='bar';
  public barChartPlugins = [];

  constructor() { }

  ngOnChanges(): void {
    this.refreshData();
  }

  refreshData(){
    this.barChartData = [{
      data: this.measures.map(m => m.y),
      label: this.title(),
    }];
    this.barChartLabels = this.measures.map(m => m.x);//.map(d => d.toISOString());
    this.barChartColors = [{
      borderColor: this.color().replace('80', 'FF'),
      backgroundColor: this.color(),
    }];
    console.log(this.measures);
  }

  title(): string {
    return BarChartComponent.measureTypeTitle(this.measureType);
  }

  color(): string {
    return BarChartComponent.measureTypeColor(this.measureType);
  }

  // https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c
  static measureTypeColor(measureType: string): string {
    switch (measureType) {
      case 'Temp':
        return '#ef476f80';
      case 'Wind':
        return '#ffd16680';
      case 'Press':
        return '#06d6a080';
      default:
        return '#00000080';
    }
  }

  static measureTypeTitle(measureType: string): string {
    switch (measureType) {
      case 'Temp':
        return 'Temperature';
      case 'Wind':
        return 'Wind';
      case 'Press':
        return 'Pressure';
      default:
        return 'Error';
    }
  }

}
