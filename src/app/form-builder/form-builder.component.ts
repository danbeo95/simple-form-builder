import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateQuestionDialogComponent } from '../create-question-dialog/create-question-dialog.component';
import { Question } from '../models';
import { QuestionParagraphItemComponent } from '../question-paragraph-item/question-paragraph-item.component';
import { QuestionCheckListItemComponent } from '../question-check-list-item/question-check-list-item.component';
import { MatDivider } from '@angular/material/divider';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShareAnswerService } from '../share-answer.service';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [MatButtonModule, QuestionParagraphItemComponent, QuestionCheckListItemComponent, MatDivider, ReactiveFormsModule, RouterLink],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
})
export class FormBuilderComponent {
  questions = signal<Question[]>([]);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  shareAnswerService = inject(ShareAnswerService);

  formGroup = this.fb.group({
    answers: this.fb.array<FormControl<string | Array<boolean>>>([])
  })

  get answersFormArr() {
    return this.formGroup.get('answers') as FormArray;
  }

  openCreateModal() {
    const dialogRef = this.dialog.open<CreateQuestionDialogComponent, any, Question>(CreateQuestionDialogComponent, {
      width: '80vw',
    });
    dialogRef.afterClosed().subscribe(question => {
      if (question) {
        this.answersFormArr.push(this.fb.control(''))
        this.questions.update(prev => prev.concat(question));
      }
    })
  }

  showAnswers() {
    const answers = this.formGroup.get('answers')?.value;
    if (answers) {
      const questions = this.questions().map((question, i) => {
        if (question.type === 'paragraph') {
          return { ...question, answer: answers[i] }
        }
        if (question.type === 'check_list') {
          return {
            ...question,
            options: question.options.map((option, j) => ({ ...option, selected: answers[i][j] }))
          }
        }
        return question;
      })
      console.log(questions)
      this.shareAnswerService.questions.set(questions as Question[]);
    }
  }
}
