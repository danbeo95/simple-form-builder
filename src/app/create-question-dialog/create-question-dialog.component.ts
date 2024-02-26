import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { Subject, takeUntil } from 'rxjs';
import { Question, QuestionCheckList } from '../models';


interface FormGroupType {
  type: FormControl<string | null>,
  title: FormControl<string | null>,
  required: FormControl<boolean | null>,
  options?: FormArray<FormControl<string | null>>
}

@Component({
  selector: 'app-create-question-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatCheckbox,
    ReactiveFormsModule,
  ],
  templateUrl: './create-question-dialog.component.html',
  styleUrl: './create-question-dialog.component.scss',
})
export class CreateQuestionDialogComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<CreateQuestionDialogComponent>)
  destroy$ = new Subject<void>();
  questionTypes = [{
    id: 'paragraph',
    label: 'Paragraph'
  }, {
    id: 'check_list',
    label: 'Check list'
  }]

  formGroup = this.formBuilder.group<FormGroupType>({
    type: this.formBuilder.control('', [Validators.required]),
    title: this.formBuilder.control('', [Validators.required]),
    required: this.formBuilder.control(false)
  })

  get optionsFormArr() {
    return this.formGroup.get('options') as FormArray | undefined;
  }

  ngOnInit() {
    this.formGroup.get('type')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(type => {
      console.log(type)
      if (type === 'check_list') {
        this.formGroup.addControl('options', this.formBuilder.array([
          this.formBuilder.control('', [Validators.required])
        ]))
      } else {
        this.formGroup.removeControl('options')
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewOption() {
    console.log(this.optionsFormArr);
    if (this.optionsFormArr) {
      this.optionsFormArr.push(this.formBuilder.control('', [Validators.required]))
    }
  }

  onClickDone() {
    if (this.formGroup.invalid) {
      return;
    }
    const formValue = this.formGroup.value;
    const question: Question = {
      title: formValue.title || '',
      type: formValue.type as any || '',
      required: formValue.required || false
    }
    if (formValue.options) {
      (question as unknown as QuestionCheckList).options = formValue.options.map((item, i) => ({
        id: i,
        content: item || ''
      }))
    }
    this.dialogRef.close(question);
  }
}
