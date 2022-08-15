import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './shared/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dialog: MatDialog) { }

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '340px',
      panelClass: 'login-dialog',
      autoFocus: false,
    });
  }
}
