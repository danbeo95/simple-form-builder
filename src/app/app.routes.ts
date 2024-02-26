import { Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AnswerPreviewComponent } from './answer-preview/answer-preview.component';

export const routes: Routes = [
  { path: 'form/builder', component: FormBuilderComponent },
  { path: 'form/answer', component: AnswerPreviewComponent },
  { path: '', redirectTo: 'form/builder', pathMatch: 'full' }
];
