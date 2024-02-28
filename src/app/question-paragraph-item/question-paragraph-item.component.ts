import { Component, inject, input, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { QuestionParagraph } from '../models';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-question-paragraph-item',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './question-paragraph-item.component.html',
  styleUrl: './question-paragraph-item.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuestionParagraphItemComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: QuestionParagraphItemComponent,
      multi: true
    }
  ]
})
export class QuestionParagraphItemComponent implements ControlValueAccessor, OnInit, Validator {
  fb = inject(FormBuilder);
  question = input.required<QuestionParagraph>()

  content = this.fb.control('');

  ngOnInit() {
    if (this.question().required) {
      this.content.setValidators([Validators.required]);
    }
  }

  registerOnChange(fn: any): void {
    this.content.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.content.setValue(obj);
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.question().required) {
      return !!this.content.value ? null : { required: true };
    }
    return null;
  }
}
