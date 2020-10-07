import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.inject(TokenService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check get/set token', () => {
    const token = 'Some Token';
    expect(service.getToken()).not.toBe(token);
    service.setToken(token);
    expect(service.getToken()).toBe(token);
  });

});
