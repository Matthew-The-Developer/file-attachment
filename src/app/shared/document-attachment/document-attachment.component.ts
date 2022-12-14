import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, filter, map, Observable, ReplaySubject } from 'rxjs';
import { CallStatus } from 'src/app/models/call-status.enum';
import { FileExtension } from 'src/app/models/file-extension.model';
import { FileGroupType, FileTypeGroup } from 'src/app/models/file-group-type.model';
import { FileRequestOptions } from 'src/app/models/file-request-options.model';
import { PatientFile } from 'src/app/models/patient-file.model';
import { DocumentService } from 'src/app/services/document.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { PdfPreviewComponent } from '../pdf-preview/pdf-preview.component';

@Component({
  selector: 'app-document-attachment',
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss']
})
export class DocumentAttachmentComponent implements OnInit {
  @Input() options!: FileRequestOptions;
  @Input() groupIDs!: number[]; 
  @Input() getExisting: boolean = false;
  @Input() singleFile: boolean = false;
  @Input() readonly: boolean = false;
  @Input() defaultAttachmentTypeID?: number = undefined;
  @Input() defaultToDateUploaded: boolean = false;
  @Input() documentDateLabel: string = 'Document Date';

  _selectedFiles: BehaviorSubject<PatientFile[]> = new BehaviorSubject<PatientFile[]>([]);
  _existingFiles: BehaviorSubject<PatientFile[] | null> = new BehaviorSubject<PatientFile[] | null>(null);
  _attachmentTypes: BehaviorSubject<FileGroupType[] | null> = new BehaviorSubject<FileGroupType[] | null>(null);
  _attachmentTypeGroups: BehaviorSubject<FileTypeGroup[]> = new BehaviorSubject<FileTypeGroup[]>([]);
  _extensions: BehaviorSubject<FileExtension[] | null> = new BehaviorSubject<FileExtension[] | null>(null);

  attaching: Map<PatientFile, CallStatus> = new Map<PatientFile, CallStatus>();
  deleting: Map<PatientFile, boolean> = new Map<PatientFile, boolean>();
  typeChanging: Map<PatientFile, boolean> = new Map<PatientFile, boolean>();
  dateChanging: Map<PatientFile, boolean> = new Map<PatientFile, boolean>();

  constructor(
    private documentService: DocumentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.documentService.getFileExtensions().subscribe(this._extensions);
    this.documentService.getFileGroups(this.groupIDs).subscribe(this._attachmentTypes);
    this.attachmentTypes$.pipe(
      filter(groups => !!groups),
      map(groups => {
        const names = new Map(groups!.map(group => [group.groupID, group.groupName]));
        const typeGroups: FileTypeGroup[] = [];
        Array.from(names.keys()).forEach(id => typeGroups.push({ groupName: names.get(id)!, types: groups!.filter(group => group.groupID === id) }));
        return typeGroups;
      })
    ).subscribe(this._attachmentTypeGroups);

    if (this.getExisting) {
      this.documentService.getPatientFiles(this.options).subscribe(this._existingFiles);
    }
  }

  get existingFiles$(): Observable<PatientFile[] | null> { return this._existingFiles.asObservable() }
  get selectedFiles$(): Observable<PatientFile[]> { return this._selectedFiles.asObservable() }
  get attachmentTypes$(): Observable<FileGroupType[] | null> { return this._attachmentTypes.asObservable() }
  get attachmentTypeGroups$(): Observable<FileTypeGroup[]> { return this._attachmentTypeGroups.asObservable() }
  get extensions$(): Observable<FileExtension[] | null> { return this._extensions.asObservable() }
  get acceptableExtensions$(): Observable<string> { 
    return this._extensions.asObservable().pipe(
      filter(types => !!types),
      map(types => types!.map(type => `.${type.extension}`).join(','))
    );
  }

  selected(event: any): void {
    if (event.target.files.length > 0) {
      const files: PatientFile[] = (Array.from(event.target.files) as File[]).map((file: File) => {
        const splitName = file.name.split('.');
        const name = splitName.slice(0, -1).join('.');
        const extensionRef = this._extensions.value!.find(extension => extension.extension === splitName[splitName.length - 1]);

        let fileType = null;
        if (this.defaultAttachmentTypeID) {
          fileType = this._attachmentTypes.value!.find(type => type.groupTypeID === this.defaultAttachmentTypeID)
        } else {
          fileType = this._attachmentTypes.value![0];
        }

        return {
          file,
          name,
          byteSize: file.size,
          extensionID: extensionRef!.extensionID,
          extension: extensionRef!.extension,
          documentDate: this.defaultToDateUploaded ? new Date() : new Date(file.lastModified),
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
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, { data: `${file.name}.${file.extension}` });

    dialogRef.afterClosed().pipe(filter(val => val!!)).subscribe(() => {
      this.deleting.set(file, true);
      this.documentService.deletePatientFile(file, this.options).subscribe(files => {
        this._existingFiles.next(files);
        this.deleting.delete(file);
      });
    });
  }

  attachFile(file: PatientFile): void {
    this.attaching.set(file, CallStatus.Loading);
    this.documentService.createPatientFile(file, this.options).subscribe(files => {
      if (this.getExisting) {
        this._existingFiles.next(files);
      }
      this.attaching.delete(file);
      this.deselectFile(file);
    }, (error) => {
      console.log(error);
      this.attaching.set(file, CallStatus.Failure);
    });
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
    if (date) {
      this.dateChanging.set(file, true);
      this.documentService.updatePatientFileDate(file, date, this.options).subscribe(files => {
        this._existingFiles.next(files);
        this.dateChanging.delete(file);
      });
    }
  }

  existingFileTypeChange(file: PatientFile, type: FileGroupType): void {
    this.typeChanging.set(file, true);
    this.documentService.updatePatientFileGroupType(file, type, this.options).subscribe(files => {
      this._existingFiles.next(files);
      this.typeChanging.delete(file);
    });
  }

  hasFailedAttach(file: PatientFile): string {
    return this.attaching.has(file) && this.attaching.get(file) === CallStatus.Failure ? 'warn' : 'accent';
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
