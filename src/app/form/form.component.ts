import { Component, OnInit } from '@angular/core';
import { FileRequestOptions } from '../models/file-request-options.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  options: FileRequestOptions = { attachmentWorkItemID: 33 };
  groupIDs: number[] = [ 1, 2 ];

  constructor() { }

  ngOnInit(): void {
  }

}
