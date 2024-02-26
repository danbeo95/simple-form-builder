import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionParagraphItemComponent } from './question-paragraph-item.component';

describe('QuestionParagraphItemComponent', () => {
  let component: QuestionParagraphItemComponent;
  let fixture: ComponentFixture<QuestionParagraphItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionParagraphItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionParagraphItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
