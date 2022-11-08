import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RoomsPageComponent } from './rooms-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {ReturnButtonComponent} from '../../components/return-button/return-button.component'
import {ReturnButtonModule} from '../../components/return-button/return-button.module'
import {PaginationButtonsComponent} from '../../components/pagination-buttons/pagination-buttons.component'
import {PaginationButtonsModule} from '../../components/pagination-buttons/pagination-buttons.module'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import gameMocked from '../../mockData/game.mock';
import playerMocked from '../../mockData/player.mock';
import { GamesService } from '../../services/games/games.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { config } from '../../shared/constants/socketio.config'


describe('RoomsPageComponent', () => {
  let gameService: jasmine.SpyObj<GamesService>;
  let playerService: jasmine.SpyObj<PlayersService>;
  let component: RoomsPageComponent;
  let fixture: ComponentFixture<RoomsPageComponent>;
  let socketService: jasmine.SpyObj<SocketService>;
  let router: jasmine.SpyObj<Router>;
  let storageService:jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GamesService', ['getRooms','getGame']);
    const socketServiceSpy = jasmine.createSpyObj('SocketService', ['connectToGame']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const playerServiceSpy = jasmine.createSpyObj('PlayersService', ['getPlayer']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getUserFromStorage','getAccessToken']);
    await TestBed.configureTestingModule({
      providers:[
        MatSnackBar,
        { provide: GamesService, useValue: gameServiceSpy },
        { provide: SocketService, useValue: socketServiceSpy },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: Router, useValue: routerSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: PlayersService, useValue: playerServiceSpy },

      ],
      declarations: [ 
        RoomsPageComponent ,
        ReturnButtonComponent,
        PaginationButtonsComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        ReturnButtonModule,
        PaginationButtonsModule,
        SocketIoModule.forRoot(config)
      ]
    })
    .compileComponents();
    gameService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    socketService = TestBed.inject(SocketService) as jasmine.SpyObj<SocketService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    playerService = TestBed.inject(PlayersService) as jasmine.SpyObj<PlayersService>;
    gameService.getRooms.and.returnValue(Promise.resolve(Array.of()))
    fixture = TestBed.createComponent(RoomsPageComponent);
    component = fixture.componentInstance;    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRooms: should use getRooms', (done: DoneFn) => {
    const expectedValue= [gameMocked];
    gameService.getRooms.and.returnValue(Promise.resolve(expectedValue));
    component.getRooms().then(result =>{
      expect(result).toBe(expectedValue);
    })
    done()
  });

  it('getNextRooms: should use getRooms ', () => {
    spyOn(component,'getNextRooms').and.callThrough();
    const expectedValue= [gameMocked];
    gameService.getRooms.and.returnValue(Promise.resolve(expectedValue));
    component.getNextRooms()
    expect(gameService.getRooms).toHaveBeenCalled();
    expect(component.hideLeftArrow).toBeTrue();
  });

  it('getPreviousRooms: should use getRooms and turn hideLeftArrow true', () => {
    component.offset= 4;
    component.limit=4;
    component.hideLeftArrow=false;
    fixture.detectChanges();
    spyOn(component,'getPreviousRooms').and.callThrough();
    const expectedValue= [gameMocked];
    gameService.getRooms.and.returnValue(Promise.resolve(expectedValue));
    component.getPreviousRooms()
    expect(gameService.getRooms).toHaveBeenCalled();
    expect(component.hideLeftArrow).toBeTrue()
  });

  it('getPreviousRooms: should use getRooms and keep hideLeftArrow false', () => {
    spyOn(component,'getPreviousRooms').and.callThrough();
    component.offset= 4;
    component.limit=2;
    component.hideLeftArrow=false;
    fixture.detectChanges();
    const expectedValue= [gameMocked];
    gameService.getRooms.and.returnValue(Promise.resolve(expectedValue));
    component.getPreviousRooms()
    expect(gameService.getRooms).toHaveBeenCalled();
    expect(component.hideLeftArrow).toBeFalse()
  });

  it('enterGame: should use getGame', () => {
    gameService.getGame.and.returnValue(Promise.resolve(gameMocked));
    socketService.connectToGame.and.callFake(() => {});
    playerService.getPlayer.and.returnValue(Promise.resolve(playerMocked));
    storageService.getUserFromStorage.and.returnValue(playerMocked);
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    component.enterGame(gameMocked);
    expect(gameService.getGame).toHaveBeenCalled();
  });

});
