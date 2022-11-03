import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FileExtension } from 'src/app/models/file-extension.model';
import { FileGroupType } from 'src/app/models/file-group-type.model';
import { PatientFile } from 'src/app/models/patient-file.model';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss']
})
export class DocumentDialogComponent implements OnInit {
  _attachmentTypes: BehaviorSubject<FileGroupType[]> = new BehaviorSubject<FileGroupType[]>([
    { groupTypeID: 0, groupID: 0, groupName: 'Transplant', typeID: 0, typeName: 'Acceptance' },
    { groupTypeID: 1, groupID: 0, groupName: 'Transplant', typeID: 1, typeName: 'Activation' },
    { groupTypeID: 2, groupID: 0, groupName: 'Transplant', typeID: 2, typeName: 'Declination' },
    { groupTypeID: 3, groupID: 0, groupName: 'Transplant', typeID: 3, typeName: 'Deactivation' },
  ]);

  _extensions: BehaviorSubject<FileExtension[]> = new BehaviorSubject([
    { extensionID: 0, extension: 'bmp', MIMEType: 'image/bmp', description: 'Standard Windows Bitmap image' },
    { extensionID: 1, extension: 'gif', MIMEType: 'image/gif', description: 'Graphics interchange file format' },
    { extensionID: 2, extension: 'jpeg', MIMEType: 'image/jpeg', description: 'JPEG bitmap image format file' },
    { extensionID: 3, extension: 'jpg', MIMEType: 'image/jpeg', description: 'JPEG bitmap image format file' },
    { extensionID: 4, extension: 'pdf', MIMEType: 'application/pdf', description: 'Adobe Portable document format' },
    { extensionID: 5, extension: 'csv', MIMEType: 'application/vnd.ms-excel', description: 'Comma Separated Value file' },
    { extensionID: 6, extension: 'doc', MIMEType: 'application/msword', description: 'Microsoft Word 97 to 2003 document file' },
    { extensionID: 7, extension: 'docx', MIMEType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', description: 'Microsoft Word 2007/2010 Open XML document file' },
  ]);

  _existingFiles: BehaviorSubject<PatientFile[]> = new BehaviorSubject<PatientFile[]>([
    {
      fileID: 0,
      attachedToRecordID: 122324,
      name: 'pdf-test',
      extensionID: 4,
      extension: 'pdf',
      documentDate: new Date(1659762822100),
      byteSize: 2534446,
      groupTypeID: 1,
      groupName: 'Transplant',
      typeName: 'Activation',
      url: 'https://github.com/Matthew-The-Developer/file-attachment/blob/master/src/assets/pdf-test.pdf'
    },
    {
      fileID: 0,
      attachedToRecordID: 122324,
      name: 'Programming-Memes-Programmer-while-sleeping',
      extensionID: 3,
      extension: 'jpg',
      documentDate: new Date(1661779977375),
      byteSize: 59868,
      groupTypeID: 0,
      groupName: 'Transplant',
      typeName: 'Acceptance',
      url: 'https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg?x34900'
    },
    {
      fileID: 0,
      attachedToRecordID: 122324,
      name: 'example03',
      extensionID: 7,
      extension: 'docx',
      documentDate: new Date(1659672717869),
      byteSize: 108816,
      groupTypeID: 1,
      groupName: 'Transplant',
      typeName: 'Activation',
      url: './assets/example03.docx'
    },
  ]);

  constructor() { }

  ngOnInit(): void {
  }

  openDocumentAttachment(): void {

  }


}
