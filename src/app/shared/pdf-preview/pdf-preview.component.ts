import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VirtualDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {
  url!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: File | VirtualDocument,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (this.data instanceof File) {
      const reader = new FileReader();
      reader.onload = () => this.url = reader.result as string;
      reader.readAsDataURL(this.data);
    } else {
      this.url = this.data.url;
      this.http.get(this.url, { responseType: 'arraybuffer' }).subscribe(result => console.log(result));
    }
  }
}
