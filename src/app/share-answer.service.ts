import { computed, Injectable, signal } from '@angular/core';
import { Question } from './models';

@Injectable({
  providedIn: 'root'
})
export class ShareAnswerService {
  questions = signal<Question[]>([])
  questionsWithSelectedAnswers = computed(() => this.questions().map(question => {
    if (question.type === 'check_list') {
      question.options = question.options.filter(option => option.selected);
    }
    return question;
  }))

  constructor() {
  }
}
