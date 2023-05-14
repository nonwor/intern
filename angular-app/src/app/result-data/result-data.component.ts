import { Component, Input, SimpleChanges} from '@angular/core';
import { Store, TimingErr, DataErr } from '../store';
import { HttpClient, } from '@angular/common/http';
import * as moment from 'moment';
import { FilterByPipe } from '../filterByCustomerName.pipe';

@Component({
  selector: 'app-result-data',
  templateUrl: './result-data.component.html',
  styleUrls: ['./result-data.component.css'],
  providers:[FilterByPipe],
})

export class ResultDataComponent {
  @Input() message?: string;

  // placeHolder:string = "20230509-2346";
  apiUrl:string = " ";
  constructor(private http: HttpClient) { }

  dataError: DataErr[] = [];
  timingError: TimingErr[] = [];
  itemCount: number = 0;
  
  result:any;

  //Error type, 0=Data, 1=Timing, 2 Default not select
  whichError:number = 2;

  //Init unique var for filter select
  uniqueCustomerNameDataError: string[] =[];
  uniqueCustomerNameTimingError: string[] = [];

  //Attemp to filter by customer name here
  selectedValueData:string = "";
  selectedValueTiming:string = "";
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && !changes['message'].firstChange) {
      this.doSomething();
    }
  }

  doSomething() {
    console.log('Message changed to:', this.message);
    //Reset Data on new select "message" from parent
    this.dataError = [];
    this.timingError =[];
    this.itemCount = 0;
    this.uniqueCustomerNameDataError =[];
    this.uniqueCustomerNameTimingError=[];
    this.selectedValueData = "";
    this.selectedValueTiming = "";

    this.getMassiveData()
  }

  execute() {
    // this.apiUrl = 'https://swapi.dev/api/people/' +this.searchTerm;
    this.apiUrl ='http://localhost:8080/item/'+this.message;
    return this.http.get<Store[]>(this.apiUrl);
  }

  getMassiveData(){
    
    // console.log(this.placeHolder);
    this.execute().subscribe((data:Store[])=>{
      console.log(data);
      this.result = data;
      for(const i of this.result){
        for(const j of i){
          this.itemCount ++;
          if(Object.keys(j).length == 7){
            //We need to convert time string to date object
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
      console.log(this.itemCount);
      console.log(this.timingError.length)
      console.log(this.dataError.length)
      console.log(this.dataError[0])
      console.log(this.timingError[0])

      this.uniqueCustomerNameDataError = [...new Set(this.dataError.map(item=>item.cname))]
      this.uniqueCustomerNameTimingError = [...new Set(this.timingError.map(item=>item.cname))]
    })

  }
  
  //Select which Error log (Data = 0 or Timing = 1, default to 2) to display
  onToggleChange(event:any) {
    this.whichError = event.value;
  }

  // focusedObject?:TimingErr;

  doSomethignWithData(data:DataErr){
    console.log("We have extract out this particular item here");
    console.log(data);
    // this.focusedObject = data;
  }
  
}
