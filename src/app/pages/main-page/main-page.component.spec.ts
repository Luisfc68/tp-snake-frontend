import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SocketIoModule } from 'ngx-socket-io';
import { GamesService } from 'src/app/services/games/games.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import gameMocked from '../../mockData/game.mock';
import playerMocked from '../../mockData/player.mock';
import { config } from '../../shared/constants/socketio.config';
import { MainPageComponent } from './main-page.component';


describe('MainPageComponent', () => {
  let router: jasmine.SpyObj<Router>;
  let storageService:jasmine.SpyObj<StorageService>;
  let gameService: jasmine.SpyObj<GamesService>;
  let socketService: jasmine.SpyObj<SocketService>;
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let playerService: jasmine.SpyObj<PlayersService>;

  beforeEach(async () => {
    const socketServiceSpy = jasmine.createSpyObj('SocketService', ['connectToGame']);
    const gameServiceSpy = jasmine.createSpyObj('GamesService', ['getRooms','getGame','createGame']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['clearStorage','getUserFromStorage']);
    const playerServiceSpy = jasmine.createSpyObj('PlayersService', ['getPlayer']);

    await TestBed.configureTestingModule({
      providers: [
        MainPageComponent,
        JwtHelperService,
        { provide: SocketService, useValue: socketServiceSpy },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        MatDialog,
        { provide: Router, useValue: routerSpy },
        { provide: GamesService, useValue: gameServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: PlayersService, useValue: playerServiceSpy },
        MatSnackBar
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        MatIconTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule, 
        NoopAnimationsModule,
        SocketIoModule.forRoot(config)
      ],
      declarations: [ 
        MainPageComponent,
        MatIcon,
        MatFormField
      ]
    })
    .compileComponents();
    socketService = TestBed.inject(SocketService) as jasmine.SpyObj<SocketService>;
    gameService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    playerService = TestBed.inject(PlayersService) as jasmine.SpyObj<PlayersService>;
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toRanking: should use navigateByUrl', () => {
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    component.toRanking()
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('toRooms: should use navigateByUrl', () => {
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    component.toRooms()
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('doLogout: should use navigateByUrl', () => {
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    storageService.clearStorage.and.callFake(()=>{});
    component.doLogout();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('createGame: should use createGame and navigateByUrl', () => {
    gameService.createGame.and.returnValue(Promise.resolve(gameMocked));
    socketService.connectToGame.and.callFake(()=>{});
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    storageService.getUserFromStorage.and.returnValue(playerMocked);
    component.createGame();
    expect(gameService.createGame).toHaveBeenCalled();
    gameService.createGame().then(()=>{
      expect(socketService.connectToGame).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalled();
    });
  });

  it('joinExistingGame: should use connectToGame ', () => {
    gameService.getGame.and.returnValue(Promise.resolve(gameMocked));
    socketService.connectToGame.and.callFake(()=>{});
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    storageService.getUserFromStorage.and.returnValue(playerMocked);
    playerService.getPlayer.and.returnValue(Promise.resolve(playerMocked));
    component.joinExistingGame();
    expect(gameService.getGame).toHaveBeenCalled();
    gameService.getGame('example').then(()=>{
      expect(socketService.connectToGame).toHaveBeenCalled();
    });
  });
});
