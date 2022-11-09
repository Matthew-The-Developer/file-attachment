import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DocumentAttachmentComponent } from './document-attachment/document-attachment.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SpacerDirective } from './directives/spacer.directive';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { LoginComponent } from './login/login.component';
import { ErrorMessagingComponent } from './error-messaging/error-messaging.component';
import { AuthService } from '../services/auth.service';
import { CompactDirective } from './directives/compact.directive';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicMenuComponent } from './dynamic-menu/dynamic-menu.component';

@NgModule({
  declarations: [
    DocumentAttachmentComponent,
    ImagePreviewComponent,
    SpacerDirective,
    PdfPreviewComponent,
    FileSizePipe,
    LoginComponent,
    ErrorMessagingComponent,
    CompactDirective,
    UserMenuComponent,
    DocumentDialogComponent,
    DynamicMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    DocumentAttachmentComponent,
    ImagePreviewComponent,
    SpacerDirective,
    UserMenuComponent,
  ],
  providers: [
    AuthService,
    CompactDirective,
  ]
})
export class SharedModule { }
