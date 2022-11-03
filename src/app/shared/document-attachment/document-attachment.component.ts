import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FileExtension } from 'src/app/models/file-extension.model';
import { FileGroupType } from 'src/app/models/file-group-type.model';
import { PatientFile } from 'src/app/models/patient-file.model';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { PdfPreviewComponent } from '../pdf-preview/pdf-preview.component';

@Component({
  selector: 'app-document-attachment',
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss']
})
export class DocumentAttachmentComponent implements OnInit {
  @Input() _existingFiles: BehaviorSubject<PatientFile[]> = new BehaviorSubject<PatientFile[]>([]);
  @Input() _attachmentTypes: BehaviorSubject<FileGroupType[]> = new BehaviorSubject<FileGroupType[]>([]);
  @Input() _extensions: BehaviorSubject<FileExtension[]> = new BehaviorSubject<FileExtension[]>([]);
  @Input() defaultAttachmentTypeID?: number = undefined;
  @Input() singleFile: boolean = false;
  @Input() uploadonly: boolean = false;
  @Input() readonly: boolean = false;

  _selectedFiles: BehaviorSubject<PatientFile[]> = new BehaviorSubject<PatientFile[]>([]);;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  get existingFiles$(): Observable<PatientFile[]> { return this._existingFiles.asObservable() }
  get selectedFiles$(): Observable<PatientFile[]> { return this._selectedFiles.asObservable() }
  get attachmentTypes$(): Observable<FileGroupType[]> { return this._attachmentTypes.asObservable() }
  get acceptableExtensions$(): Observable<string> { return this._extensions.asObservable().pipe(map(types => types.map(type => type.extension).join(','))) }

  selected(event: any): void {
    console.log(event);
    if (event.target.files.length > 0) {
      const files: PatientFile[] = (Array.from(event.target.files) as File[]).map((file: File) => {
        const splitName = file.name.split('.');
        const name = splitName.slice(0, -1).join('.');
        const extensionRef = this._extensions.value.find(extension => extension.extension === splitName[splitName.length - 1]);

        let fileType = null;
        if (this.defaultAttachmentTypeID) {
          fileType = this._attachmentTypes.value.find(type => type.groupTypeID === this.defaultAttachmentTypeID)
        } else {
          fileType = this._attachmentTypes.value[0];
        }

        return {
          file,
          name,
          byteSize: file.size,
          extensionID: extensionRef!.extensionID,
          extension: extensionRef!.extension,
          documentDate: new Date(file.lastModified),
          groupTypeID: fileType!.groupTypeID,
          typeName: fileType!.typeName,
          groupName: fileType!.groupName,
        };
      });

      this._selectedFiles.next(files);
      event.target.value = null;
    }
  }

  deselectFile(fileToRemove: PatientFile): void {
    const files = this._selectedFiles.value;
    this._selectedFiles.next(files.filter(file => file !== fileToRemove));
  }

  deleteFile(file: PatientFile): void {

  }

  selectedFileDateChange(file: PatientFile, date: Date): void {
    if (date) {
      file.documentDate = date;
    }
  }
  
  selectedFileTypeChange(file: PatientFile, type: FileGroupType): void {
    file.groupTypeID = type.groupTypeID;
    file.groupName = type.groupName;
    file.typeName = type.typeName;
  }

  existingFileDateChange(file: PatientFile, date: Date): void {

  }

  existingFileTypeChange(file: PatientFile, type: FileGroupType): void {

  }

  // openPreview(file: MedicalDocument | VirtualDocument): void {
  //   if (ImageExtensions.has(document.extension)) {
  //     this.dialog.open(ImagePreviewComponent, {
  //       data: document,
  //       hasBackdrop: true,
  //       panelClass: 'image-preview-dialog',
  //       maxHeight: '90vh',
  //     });
  //   } else if (PDFExtensions.has(document.extension)) {
  //     this.dialog.open(PdfPreviewComponent, {
  //       data: document,
  //       hasBackdrop: true,
  //       panelClass: 'pdf-preview-dialog',
  //       maxHeight: '90vh',
  //     });
  //   }
  // }

  // openImagePreview(document: MedicalDocument | VirtualDocument): void {
  //   this.dialog.open(ImagePreviewComponent, {
  //     data: document,
  //     hasBackdrop: true,
  //     panelClass: 'image-preview-dialog',
  //     maxHeight: '90vh',
  //   })
  // }

  // openPDFPreview(document: MedicalDocument | VirtualDocument): void {
  //   this.dialog.open(PdfPreviewComponent, {
  //     data: document,
  //     hasBackdrop: true,
  //     panelClass: 'pdf-preview-dialog',
  //     maxHeight: '90vh',
  //   })
  // }
}
