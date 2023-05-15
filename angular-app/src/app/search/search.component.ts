import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient, } from '@angular/common/http';
import { Store } from '../store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent {
  
  public apiUrl = '';
  constructor(private http: HttpClient) { }

  searchTerm:string ="";
  data: any;

  @Input() paramList:any[] =[];

  execute() {
    console.log(this.searchTerm)
    // this.apiUrl = 'https://swapi.dev/api/people/' +this.searchTerm;
    this.apiUrl ='http://localhost:8080/db/' + this.searchTerm;
    return this.http.get(this.apiUrl);
  }

  search(){
    this.execute().subscribe((data:any)=>{
      // console.log(data);
      this.data = data;
    })
  }
  
  selectedItem?:string;
  onSelect(log:Store): void{
    this.selectedItem = log.Key;
    console.log(this.selectedItem);
    this.paramList = [];
    this.paramList.push(this.searchTerm);
    this.paramList.push(this.selectedItem);
  }

}
