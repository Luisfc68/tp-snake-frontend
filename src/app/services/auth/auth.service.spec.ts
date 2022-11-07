import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Player } from '../../interfaces/player.interface';
import playerMocked from '../../mockData/player.mock';
import { LoginResponse } from 'src/app/interfaces/response/login.interface';
import { Observable, of } from 'rxjs';
import { PlayersService } from '../players/players.service';


describe('AuthService', () => {
  let service: AuthService;
  let storageService: jasmine.SpyObj<StorageService>;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let playerServices:jasmine.SpyObj<PlayersService>;
  let jwtHelper: jasmine.SpyObj<JwtHelperService>;
  beforeEach(() => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['saveTokensOnStorage','saveUserOnStorage','getTokensFromStorage']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const playerServicesSpy = jasmine.createSpyObj('PlayersService', ['getPlayer']);
    const jwtHelperSpy = jasmine.createSpyObj('JwtHelperService',['decodeToken']);
    TestBed.configureTestingModule({
      providers: [
        AuthService ,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: PlayersService, useValue: playerServicesSpy },
        { provide: JwtHelperService, useValue: jwtHelperSpy },

      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    playerServices = TestBed.inject(PlayersService) as jasmine.SpyObj<PlayersService>;
    jwtHelper = TestBed.inject(JwtHelperService) as jasmine.SpyObj<JwtHelperService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should login', (done: DoneFn) => {
    const expectedValue: LoginResponse= {accessToken:'example',refreshToken:'example.com'};
    storageService.saveTokensOnStorage.and.callFake((loginResponse) => {});
    storageService.saveUserOnStorage.and.callFake((loginResponse) => {});
    httpClient.post.and.returnValue(of(expectedValue));
    playerServices.getPlayer.and.callFake(() => { return Promise.resolve(playerMocked)});
    jwtHelper.decodeToken.and.returnValue('1')
    service.login('example','example').then( result =>{
      expect(result).toBe(playerMocked);
    });
    done()
  });

  it('should refresh', (done: DoneFn) => {
    const expectedValue: LoginResponse= {accessToken:'example',refreshToken:'example.com'};
    storageService.getTokensFromStorage.and.returnValue(expectedValue);
    storageService.saveTokensOnStorage.and.callFake((loginResponse) => {});
    httpClient.post.and.returnValue(of(expectedValue));
    service.refresh().then( result =>{
      expect(result).toBe(expectedValue);
    });
    done()
  });


});
