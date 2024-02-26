import { TestBed } from '@angular/core/testing';

import { ShareAnswerService } from './share-answer.service';

describe('ShareAnswerService', () => {
  let service: ShareAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
