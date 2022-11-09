import { Component, OnInit } from '@angular/core';
import { FileRequestOptions } from '../models/file-request-options.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  options: FileRequestOptions = { attachmentWorkItemID: 14 };

  constructor() { }

  ngOnInit(): void {
  }

}
