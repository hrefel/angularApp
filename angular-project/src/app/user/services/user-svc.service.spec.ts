import { TestBed } from '@angular/core/testing';

import { UserSvcService } from './user-svc.service';

describe('UserSvcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSvcService = TestBed.get(UserSvcService);
    expect(service).toBeTruthy();
  });
});
