import { Component, Input, SimpleChanges} from '@angular/core';
import { Store, TimingErr, DataErr } from '../store';
import { HttpClient, } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-result-data',
  templateUrl: './result-data.component.html',
  styleUrls: ['./result-data.component.css']
})

export class ResultDataComponent {
  @Input() message?: string;

  placeHolder:string = "20230509-2346";
  apiUrl:string = " ";
  constructor(private http: HttpClient) { }

  dataError: DataErr[] = [];
  timingError: TimingErr[] = [];
  
  result:any;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && !changes['message'].firstChange) {
      this.doSomething();
    }
  }

  doSomething() {
    console.log('Message changed to:', this.message);
    // Call your function here...
  }

  execute() {
    // this.apiUrl = 'https://swapi.dev/api/people/' +this.searchTerm;
    this.apiUrl ='http://localhost:8080/item/'+this.placeHolder;
    return this.http.get<Store[]>(this.apiUrl);
  }

  getMassiveData(){
    console.log(this.placeHolder);
    this.execute().subscribe((data:Store[])=>{
      console.log(data);
      this.result = data;
      for(const i of this.result){
        // console.log(i);
        for(const j of i){
          // console.log(j);
          if(Object.keys(j).length == 7){
            // j.now = new Date(j.now);
            j.now = moment.utc(j.now);
            this.dataError.push(j);
          }else{
            j.now = moment.utc(j.now);
            j.paulPulledDateUTC = moment.utc(j.paulPulledDateUTC);
            j.scheduleExpectedTimeUTC = moment.utc(j.scheduleExpectedTimeUTC);
            this.timingError.push(j);
          }
        }
      }
      //Check for all data?
      console.log(this.timingError.length)
      console.log(this.dataError.length)
      console.log(this.dataError[0])
      console.log(this.timingError[0])
    })

  }
  
  //Select which Error log (Data = 0 or Timing = 1, default to 0) to display
  whichError:number = 0;

  onToggleChange(event:any) {
    this.whichError = event.value;
  }
  
}
