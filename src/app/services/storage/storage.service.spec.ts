import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { LoginResponse } from '../../interfaces/response/login.interface';
import { NEVER } from 'rxjs';
import { Player } from '../../interfaces/player.interface';
import playerMocked from '../../mockData/player.mock';

describe('StorageService', () => {
  let service: StorageService;
  let localStorage;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return token value', () => {
    localStorage = {};
    const expectedValue: LoginResponse= {accessToken:'example',refreshToken:'example.com'};
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(expectedValue));
    const response = service.getTokensFromStorage();
    expect(response).toEqual(expectedValue)
  });

  it('should return null get item token', () => {
    localStorage = {};
    const expectedValue= null;
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    const response = service.getTokensFromStorage();
    expect(response).toEqual(expectedValue)
  });

  it('should save token', () => {
    const localStore = new Map();
    const expectedValue: LoginResponse= {accessToken:'example',refreshToken:'example.com'};
    spyOn(window.localStorage,'setItem').and.callFake(
        (key,value) => localStore.set(key,value)
    );
    service.saveTokensOnStorage(expectedValue);
    expect(localStore.get(service.getTokenKey())).toEqual(JSON.stringify(expectedValue))
  });

  it('should save user', () => {
    const localStore = new Map();
    const expectedValue: Player= playerMocked;
    spyOn(window.localStorage,'setItem').and.callFake(
        (key,value) => localStore.set(key,value)
    );
    service.saveUserOnStorage(expectedValue);
    expect(localStore.get(service.getUserKey())).toEqual(JSON.stringify(expectedValue))
  });

  it('should return player', () => {
    const localStore = new Map();
    const expectedValue: Player= playerMocked;
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(expectedValue));
    const response = service.getUserFromStorage();
    expect(response).toEqual(expectedValue)
  });

  it('should return null get user', () => {
    const localStore = new Map();
    const expectedValue: Player= playerMocked;
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(expectedValue));
    const response = service.getUserFromStorage();
    expect(response).toEqual(expectedValue)
  });

  it('should return access token', () => {
    localStorage = {accessToken:'example'};
    const expectedValue: LoginResponse= {accessToken:'example',refreshToken:'example.com'};
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(expectedValue));
    const response = service.getAccessToken();
    expect(response).toEqual(localStorage.accessToken)
  });

});
