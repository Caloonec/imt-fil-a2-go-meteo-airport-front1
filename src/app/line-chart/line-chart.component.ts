import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
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

  public lineChartData: ChartDataset[] = [];
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
    ],
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
    this.lineChartData = [{ data: this.measures.map(m => m.y), label: this.title() }];;
    this.lineChartLabels = this.measures.map(m => m.x).map(d => d.toISOString())
    this.lineChartColors = [{ borderColor: 'black', backgroundColor: this.color() }];
    console.log(this.measures);
  }

  title(): string {
    return LineChartComponent.measureTypeTitle(this.measureType);
  }

  color(): string {
    return LineChartComponent.measureTypeColor(this.measureType);
  }

  static measureTypeColor(measureType: string): string {
    switch (measureType) {
      case 'Temp':
        return 'rgba(255, 0, 0, 0.3)';
      case 'Wind':
        return 'rgba(0, 255, 0, 0.3)';
      case 'Press':
        return 'rgba(0, 0, 255, 0.3)';
      default:
        return 'rgba(0, 0, 0, 0.3)';
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
