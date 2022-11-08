import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import playerMocked from '../../mockData/player.mock';

describe('PlayersServiceService', () => {
  let service: PlayersService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post','put']);
    TestBed.configureTestingModule({
      providers: [
        PlayersService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(PlayersService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPlayer: should get player', (done: DoneFn) => {
    const expectedValue = playerMocked;
    httpClient.get.and.returnValue(of(expectedValue));
    service.getPlayer('example').then(result =>{
      expect(result).toEqual(expectedValue);
    });
    done();
  });

  it('getPlayers: should get player', (done: DoneFn) => {
    const expectedValue = [playerMocked];
    httpClient.get.and.returnValue(of(expectedValue));
    service.getPlayers(1,1).then(result =>{
      expect(result).toEqual(expectedValue);
    });
    done();
  });

  it('createPlayer: should create player', (done: DoneFn) => {
    const expectedValue = playerMocked;
    httpClient.post.and.returnValue(of(expectedValue));
    service.createPlayer('example','example','example').then(result =>{
      expect(result).toEqual(expectedValue);
    });
    done();
  })

  it('updatePlayer: should update player', (done: DoneFn) => {
    let expectedValue = playerMocked;
    expectedValue.username= 'updated';
    httpClient.put.and.returnValue(of(expectedValue));
    service.updatePlayer('example','example','example').then(result =>{
      expect(result).toEqual(expectedValue);
    });
    done();
  })

  it('updatePlayerImage: should update player image', (done: DoneFn) => {
    let updatedValue = playerMocked;
    httpClient.put.and.returnValue(of(updatedValue));
    const image: File = new File([""], "filename", { type: 'text/html' });;
    service.updatePlayerImage(image).then(result =>{
      expect(httpClient.put).toHaveBeenCalled()
    });
    done();
  })
});
