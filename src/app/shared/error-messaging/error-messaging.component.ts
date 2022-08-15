import { AfterViewInit, ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { startWith } from 'rxjs';
import { MatErrors } from 'src/app/models/error.model';

@Component({
  selector: '[matErrorMessaging]',
  template: '{{ error }}',
  styles: []
})
export class ErrorMessagingComponent implements AfterViewInit {
  @Input() overrideMap: object = {};
  public error!: string;
  private input!: MatFormFieldControl<MatInput>;
  private name: string = '';
  private errorMap!: MatErrors;

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef  
  ) { }
  
  ngAfterViewInit(): void {
    this.errorMap = {
      required: (name: string) => `${name} is required`,
      minlength: (name: string) => `${name} should be longer`,
      maxlength: (name: string) => `${name} should be shorter`,
      pattern: (name: string) => `Invalid ${name} format`,
      min: (name: string) => `${name} is too low`,
      max: (name: string) => `${name} is too high`,
      matDatePickerMax: (name: string) => `${name} cannot be in the future`,
      incorrectDescription: (name: string) => `The ${name} doesn\'t match the content`,
      email: (name: string) => `Invalid ${name} format`,
      ...this.overrideMap,
    };

    const container = this.injector.get<MatFormField>(MatFormField);
    this.input = container._control;
    
    const inputName = (this.input.ngControl as FormControlName).name as string;
    this.name = inputName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    this.input.ngControl?.statusChanges?.pipe(startWith(this.input.ngControl.status)).subscribe(this.updateErrors);
  }

  private updateErrors = (state: 'VALID' | 'INVALID') => {
    if (state === 'INVALID') {
      const errors = this.input.ngControl?.errors || {};
      const fristError = Object.keys(errors)[0] as keyof MatErrors;

      if (this.errorMap[fristError]) {
        this.error = this.errorMap[fristError](this.name);
      } else {
        this.error = errors[fristError];
      }

      this.cdr.detectChanges();
    }
  };
}
