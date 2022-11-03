import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientFile } from 'src/app/models/patient-file.model';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  url!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PatientFile) { }

  ngOnInit(): void {
    this.data;

    if (this.data instanceof File) {
      const reader = new FileReader();
      reader.onload = () => this.url = reader.result as string;
      reader.readAsDataURL(this.data);
    } else {
      this.url = this.data.url!;
    }
  }

  get alt(): string {
    return `${this.data.name} preview`;
  }
}
