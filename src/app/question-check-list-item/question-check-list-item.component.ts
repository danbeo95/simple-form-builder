import { Component, inject, input, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { QuestionCheckList } from '../models';
import { ControlValueAccessor, FormArray, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-check-list-item',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatCheckbox,
    ReactiveFormsModule
  ],
  templateUrl: './question-check-list-item.component.html',
  styleUrl: './question-check-list-item.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuestionCheckListItemComponent,
      multi: true
    }
  ]
})
export class QuestionCheckListItemComponent implements ControlValueAccessor, OnInit {
  fb = inject(FormBuilder);
  formGroup = this.fb.group({
    options: this.fb.array([])
  })
  question = input.required<QuestionCheckList>();

  get optionsFormArr() {
    return this.formGroup.get('options') as FormArray;
  }

  ngOnInit() {
    this.question().options.forEach(({ id, content }) => this.optionsFormArr.push(this.fb.control(false)))
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(res => {
      fn(res.options);
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.optionsFormArr.setValue(obj);
    }
  }
}
