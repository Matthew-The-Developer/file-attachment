import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  document!: MedicalDocument;
  url!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MedicalDocument) { }

  ngOnInit(): void {
    this.document = this.data;

    const reader = new FileReader();
    reader.onload = () => this.url = reader.result as string;
    reader.readAsDataURL(this.document);
  }

  get alt(): string {
    return `${this.document.name} preview`;
  }
}
