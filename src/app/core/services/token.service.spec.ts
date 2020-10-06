import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

import { ListenerCallback } from 'src/app/interfaces/IListenable';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(TokenService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check get/set token', () => {
    const token = 'Some Token';
    expect(service.token).not.toBe(token);
    service.token = token;
    expect(service.token).toBe(token);
  });

  it('should check subscribe/unsubscribe functionality', () => {
    let someValue: string;

    const callback: ListenerCallback = (val: string) => {
      someValue = val;
    };

    const firstToken = 'First token';
    service.subscribe(callback);
    service.token = firstToken;
    expect(someValue).toBe(firstToken);

    const secondToken = 'Second token';
    service.unsubscribe(callback);
    service.token = secondToken;
    expect(someValue).not.toBe(secondToken);
  });
});
