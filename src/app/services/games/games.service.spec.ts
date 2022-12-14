import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import gameMocked from '../../mockData/game.mock';
import { of } from 'rxjs';
describe('GamesServiceService', () => {
  let service: GamesService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    TestBed.configureTestingModule({
      providers: [
        GamesService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(GamesService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get games', (done: DoneFn) => {
    const expectedValue = [gameMocked];
    httpClient.get.and.returnValue(of(expectedValue));
    service.getRooms(1,1).then(result =>{
      expect(result).toEqual(expectedValue);
    });
    done();
  });

  it('getGame: should return expected value', (done: DoneFn) => {
    const expectedValue = gameMocked;
    httpClient.get.and.returnValue(of(expectedValue));
    service.getGame('example').then(result =>{
      expect(result).toEqual(expectedValue);
    });
    done();
  })

  it('createGame: should create game', (done: DoneFn) => {
    const expectedValue = gameMocked;
    httpClient.post.and.returnValue(of(expectedValue));
    service.createGame().then(result =>{
      expect(result).toEqual(expectedValue);
    });
    done();
  })
});
