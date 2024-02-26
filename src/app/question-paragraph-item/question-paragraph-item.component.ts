import { Component, inject, input } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { QuestionParagraph } from '../models';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

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
    }
  ]
})
export class QuestionParagraphItemComponent implements ControlValueAccessor {
  fb = inject(FormBuilder);
  question = input.required<QuestionParagraph>()

  content = this.fb.control('', [Validators.required]);

  registerOnChange(fn: any): void {
    this.content.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.content.setValue(obj);
  }

}
