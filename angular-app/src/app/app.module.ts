import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { SearchComponent } from './search/search.component';
import { ResultDataComponent } from './result-data/result-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    SearchComponent,
    ResultDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
