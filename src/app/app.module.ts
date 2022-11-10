import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ResetComponent } from './reset/reset.component';
import { FormComponent } from './form/form.component';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    ResetComponent,
    FormComponent,
    ModalComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PdfViewerModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
