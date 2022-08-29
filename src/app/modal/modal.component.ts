import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDialogComponent } from '../shared/document-dialog/document-dialog.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDocumentAttachment(): void {
    this.dialog.open(DocumentDialogComponent, {
      width: '55vw',
      panelClass: 'document-dialog',
      autoFocus: false,
      hasBackdrop: false,
    });
  }
}
