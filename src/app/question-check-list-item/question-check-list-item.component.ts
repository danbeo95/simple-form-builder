import { Component, inject, input, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { QuestionCheckList } from '../models';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors, Validator, Validators
} from '@angular/forms';

interface FormGroupType {
  options: FormArray<FormControl<boolean | null>>,
  other?: FormControl<string | null>
}

@Component({
  selector: 'app-question-check-list-item',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatCheckbox,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './question-check-list-item.component.html',
  styleUrl: './question-check-list-item.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuestionCheckListItemComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: QuestionCheckListItemComponent,
      multi: true
    }
  ]
})
export class QuestionCheckListItemComponent implements ControlValueAccessor, OnInit, Validator {

  fb = inject(FormBuilder);
  formGroup = this.fb.group<FormGroupType>({
    options: this.fb.array<FormControl<boolean | null>>([])
  })
  question = input.required<QuestionCheckList>();

  get optionsFormArr() {
    return this.formGroup.get('options') as FormArray;
  }

  ngOnInit() {
    this.question().options.forEach(({ id, content }) => this.optionsFormArr.push(this.fb.control(false)));
    if (this.question().allow_other_options) {
      this.formGroup.addControl('other', this.fb.control(''))
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(res => {
      const { options, other } = res;
      let _options: Array<string | boolean | null> = ((options || []) as any);
      if (other) {
        _options = _options.concat(other)
      }
      fn(_options.length === 0 ? null : _options);
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.optionsFormArr.setValue(obj);
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const { options, other } = this.formGroup.value;
    let _options: Array<string | boolean | null> = ((options || []) as any);
    if (other) {
      _options = _options.concat(other)
    }
    if (this.question().required) {
      return _options.some(item => !!item) ? null : { required: true }
    }
    return null;
  }
}
