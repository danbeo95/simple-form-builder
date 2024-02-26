import { Component, inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ShareAnswerService } from '../share-answer.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-answer-preview',
  standalone: true,
  imports: [
    MatFormField,
    MatButton,
    RouterLink,
    MatDivider
  ],
  templateUrl: './answer-preview.component.html',
  styleUrl: './answer-preview.component.scss'
})
export class AnswerPreviewComponent {
  shareAnswerService = inject(ShareAnswerService);
  questions = this.shareAnswerService.questionsWithSelectedAnswers();
  constructor() {

  }
}
