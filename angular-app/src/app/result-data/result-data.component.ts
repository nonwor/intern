import { Component, Input, SimpleChanges} from '@angular/core';
import { Store } from '../store';
import { HttpClient, } from '@angular/common/http';

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
    return this.http.get(this.apiUrl);
  }

  getMassiveData(){
    console.log(this.placeHolder);

    this.execute().subscribe((data:any)=>{
      console.log(data);
      this.result = data;
    })
  }
  

}
