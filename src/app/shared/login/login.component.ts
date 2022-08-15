import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('compacted', [
      transition('* => *', [
        animate('1s')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginGroup!: FormGroup;
  show: boolean = false;

  constructor(private fb: FormBuilder) { }

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

  hasError(controlName: string): boolean {
    const control = this.loginGroup.get(controlName);
    return control?.touched! && control?.errors != null;
  }

  
}
