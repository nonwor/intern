import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { SearchComponent } from './search/search.component';
import { ResultDataComponent } from './result-data/result-data.component';
import { FilterByPipe } from './filterByCustomerName.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    SearchComponent,
    ResultDataComponent,
    FilterByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
