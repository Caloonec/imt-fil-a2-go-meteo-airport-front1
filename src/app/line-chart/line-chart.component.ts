import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MeasureList } from 'src/models/MeasureList';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {

  @Input() measureType!: string;
  @Input() measures!: MeasureList;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any } ) = {
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
  public lineChartColors: Color[] = [];

  public lineChartLegend = true;
  public lineChartType: ChartType ='line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnChanges(){
    this.refreshData();
  }

  refreshData(){
    this.lineChartData = [{
      data: this.measures.map(m => m.y),
      label: this.title(),
      lineTension: 0.1,
      borderWidth: 1.5,
      // pointStyle: 'crossRot',
    }];
    this.lineChartLabels = this.measures.map(m => m.x);//.map(d => d.toISOString());
    this.lineChartColors = [{
      borderColor: this.color().replace('80', 'FF'),
      backgroundColor: this.color(),
    }];
    console.log(this.measures);
  }

  title(): string {
    return LineChartComponent.measureTypeTitle(this.measureType);
  }

  color(): string {
    return LineChartComponent.measureTypeColor(this.measureType);
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
