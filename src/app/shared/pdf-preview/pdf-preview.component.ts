import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {
  document!: MedicalDocument;
  url!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MedicalDocument) { }

  ngOnInit(): void {
    this.document = this.data;

    const reader = new FileReader();
    reader.onload = () => this.url = reader.result as string;
    reader.readAsDataURL(this.document);
  }
}
