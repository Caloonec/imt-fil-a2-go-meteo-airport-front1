import {Component} from '@angular/core';
import {ApiService} from "./api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private api: ApiService) {
    this.ngOnInit();
  }

  title = 'GoAirportFront';
  testData: Object = [];

  ngOnInit() {

  }
  getData(){
    this.api.getTestQuery().subscribe((data) => {
      this.testData = data;
    }, (error) => {
      console.log("An error accessing apiService");
      console.log(error)
    })

    console.log(this.testData)
  }

}
