import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCheckListItemComponent } from './question-check-list-item.component';

describe('QuestionCheckListItemComponent', () => {
  let component: QuestionCheckListItemComponent;
  let fixture: ComponentFixture<QuestionCheckListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCheckListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionCheckListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
