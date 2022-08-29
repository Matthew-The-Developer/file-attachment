import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginGroup!: FormGroup;
  show: boolean = false;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get passwordType(): string {
    return this.show ? 'text' : 'password';
  }

  get visibilityIcon(): string {
    return this.show ? 'visibility' : 'visibility_off';
  }

  login(): void {
    this.loginGroup.markAllAsTouched();
    this.loginGroup.updateValueAndValidity();

    if (this.loginGroup.valid) {
      const { email, password } = this.loginGroup.value;

      this.loading = true;

      this.authService.emailSignIn(email, password).then(() => {
        this.loading = false;

        this.dialogRef.close();
      }).catch((errors) => {
        console.log(errors);

        this.loading = false;
        this.snackBar.open('Unable to login', 'Dismiss');
      });
    } else {
      this.snackBar.open('Invalid login form', 'Dismiss');
    }
  }
}
