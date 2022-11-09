import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileRequestOptions } from 'src/app/models/file-request-options.model';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent implements OnInit {
  options: FileRequestOptions = { attachmentWorkItemID: 29 };
  groupIDs = [ 0 ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.options.attachmentReferenceID = this.data;
  }

  openDocumentAttachment(): void {

  }


}
