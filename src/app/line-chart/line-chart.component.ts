import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})


export class LineChartComponent implements OnChanges {
  @Input() values!: number[];
  @Input() labels!: string[];

  public lineChartData: ChartDataSets[] = [
    { data: this.values, 
      label: 'Series A' }
  ];
  public lineChartLabels: Label[] = this.labels;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType ='line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnChanges(){
    this.refreshData();
  }

  refreshData(){
    this.lineChartData = [{data: this.values, label:"test"}];
    this.lineChartLabels = this.labels
  }
}
