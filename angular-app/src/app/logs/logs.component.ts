import { Component } from '@angular/core';
import {logs} from '../logsinterface';
import { log_list } from '../many-logs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})

export class LogsComponent {
  logs = log_list;
  selectedItem?: logs;
  onSelect(log:logs): void{
    this.selectedItem = log;
  }
}

// export class LogsList{
//   logs = log_list;
// }
