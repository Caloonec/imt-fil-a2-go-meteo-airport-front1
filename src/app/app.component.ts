import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "./api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private api: ApiService) { }

  title = 'GoAirportFront';
  values: number[] = [];
  labels: string[] = [];

  startDate: string = "";
  endDate: string = "";



  startDateChanged(event: { value: Date; }){
    const d: Date = event.value;
    this.startDate = d.toISOString();
  }

  endDateChanged(event: { value: Date; }){
    const d: Date = event.value;
    this.endDate = d.toISOString();
    this.getData();
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.values = [];
    this.labels = [];


    

    this.api.getTestQuery(this.startDate, this.endDate).subscribe((data) => {

      let set = new Set();
      let dataObj = JSON.parse(JSON.stringify(data));

      for (let index = 0; index < dataObj.length; index++) {
        this.values.push(dataObj[index].value);
        let day = dataObj[index].timestamp.split('T')[0];
        if(!set.has(day)){
          this.labels.push(day);
          set.add(day);
        }else{
          this.labels.push('');
        }
      }


    }, (error) => {
      console.log("An error accessing apiService");
      console.log(error)
    })

  }

}
