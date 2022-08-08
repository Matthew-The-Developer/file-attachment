import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

import { DocumentAttachmentComponent } from './document-attachment/document-attachment.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SpacerDirective } from './directives/spacer.directive';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileSizePipe } from './pipes/file-size.pipe';

@NgModule({
  declarations: [
    DocumentAttachmentComponent,
    ImagePreviewComponent,
    SpacerDirective,
    PdfPreviewComponent,
    FileSizePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PdfViewerModule,
  ],
  exports: [
    DocumentAttachmentComponent,
    ImagePreviewComponent,
    SpacerDirective,
  ]
})
export class SharedModule { }
