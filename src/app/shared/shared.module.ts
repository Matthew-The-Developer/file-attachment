import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DocumentAttachmentComponent } from './document-attachment/document-attachment.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SpacerDirective } from './directives/spacer.directive';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { LoginComponent } from './login/login.component';
import { ErrorMessagingComponent } from './error-messaging/error-messaging.component';

@NgModule({
  declarations: [
    DocumentAttachmentComponent,
    ImagePreviewComponent,
    SpacerDirective,
    PdfPreviewComponent,
    FileSizePipe,
    LoginComponent,
    ErrorMessagingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DocumentAttachmentComponent,
    ImagePreviewComponent,
    SpacerDirective,
  ]
})
export class SharedModule { }
