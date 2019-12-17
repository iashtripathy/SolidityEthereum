import { TestBed } from '@angular/core/testing';

import { LocalcopyService } from './localcopy.service';

describe('LocalcopyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalcopyService = TestBed.get(LocalcopyService);
    expect(service).toBeTruthy();
  });
});
