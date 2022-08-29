import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentExtensions, ImageExtensions, MedicalDocument, MedicalType, PDFExtensions, VirtualDocument } from 'src/app/models/document.model';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { PdfPreviewComponent } from '../pdf-preview/pdf-preview.component';

@Component({
  selector: 'app-document-attachment',
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss']
})
export class DocumentAttachmentComponent implements OnInit {
  @Input() singleLineAttach: boolean = false;
  @Input() readonly: boolean = false;
  @Input() virtualDocuments: VirtualDocument[] = [];
  files: MedicalDocument[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  get medicalTypes(): string[] {
    return Object.values(MedicalType);
  }

  get acceptableTypes(): string {
    return [ ...DocumentExtensions.keys(), ...ImageExtensions.keys(), ...PDFExtensions.keys() ].join(',');
  }

  isImage(document: MedicalDocument | VirtualDocument): boolean {
    return ImageExtensions.has(document.extension);
  }

  isPDF(document: MedicalDocument | VirtualDocument): boolean {
    return PDFExtensions.has(document.extension);
  }

  isDocument(document: MedicalDocument | VirtualDocument): boolean {
    return DocumentExtensions.has(document.extension);
  }

  isPreviewable(document: MedicalDocument | VirtualDocument): boolean {
    return ImageExtensions.has(document.extension) || PDFExtensions.has(document.extension);
  }

  onSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.files = (Array.from(event.target.files) as File[]).map((file: File) => {
        const splitName = file.name.split('.');
        const extension = `.${splitName[splitName.length - 1]}`;

        const document = file as MedicalDocument;
        document.extension = extension;
        document.medicalType = MedicalType.ApprovalFromMother;

        console.log(document);

        return document;
      });

      event.target.value = null;
    }
  }

  removeFile(document: MedicalDocument): void {
    const fileIndex = this.files.indexOf(document);

    if (fileIndex >= 0) {
      this.files.splice(fileIndex, 1);
    }
  }

  changeMedicalType(document: MedicalDocument | VirtualDocument, type: string): void {
    document.medicalType = type as MedicalType;
  }

  openPreview(document: MedicalDocument | VirtualDocument): void {
    if (ImageExtensions.has(document.extension)) {
      this.dialog.open(ImagePreviewComponent, {
        data: document,
        hasBackdrop: true,
        panelClass: 'image-preview-dialog',
        maxHeight: '90vh',
      });
    } else if (PDFExtensions.has(document.extension)) {
      this.dialog.open(PdfPreviewComponent, {
        data: document,
        hasBackdrop: true,
        panelClass: 'pdf-preview-dialog',
        maxHeight: '90vh',
      });
    }
  }

  openImagePreview(document: MedicalDocument | VirtualDocument): void {
    this.dialog.open(ImagePreviewComponent, {
      data: document,
      hasBackdrop: true,
      panelClass: 'image-preview-dialog',
      maxHeight: '90vh',
    })
  }

  openPDFPreview(document: MedicalDocument | VirtualDocument): void {
    this.dialog.open(PdfPreviewComponent, {
      data: document,
      hasBackdrop: true,
      panelClass: 'pdf-preview-dialog',
      maxHeight: '90vh',
    })
  }
}
