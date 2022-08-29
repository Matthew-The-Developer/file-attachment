import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './shared/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private dialog: MatDialog
  ) { }

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '340px',
      panelClass: 'login-dialog',
      autoFocus: false,
    });
  }
}
