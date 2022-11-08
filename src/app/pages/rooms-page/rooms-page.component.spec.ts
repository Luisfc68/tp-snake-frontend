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
import { GamesService } from '../../services/games/games.service';

const config: SocketIoConfig = {
  url: 'http://localhost:8080',
  options: {
    query: { gameId: null },
    reconnection: false,
    autoConnect: false
  }
};

describe('RoomsPageComponent', () => {
  let gameService: jasmine.SpyObj<GamesService>;
  let component: RoomsPageComponent;
  let fixture: ComponentFixture<RoomsPageComponent>;

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GamesService', ['getRooms']);
    await TestBed.configureTestingModule({
      providers:[
        MatSnackBar,
        { provide: GamesService, useValue: gameServiceSpy },
        { provide: ComponentFixtureAutoDetect, useValue: true }
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
    gameService.getRooms.and.returnValue(Promise.resolve(Array.of()))
    fixture = TestBed.createComponent(RoomsPageComponent);
    component = fixture.componentInstance;    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use getRooms', (done: DoneFn) => {
    const expectedValue= [gameMocked];
    gameService.getRooms.and.returnValue(Promise.resolve(expectedValue));
    component.getRooms().then(result =>{
      expect(result).toBe(expectedValue);
    })
    done()
  });

  it('should use getRooms and turn hideLeftArrow false', () => {
    spyOn(component,'handleNextRoomArrows').and.callThrough();
    const expectedValue= [gameMocked];
    gameService.getRooms.and.returnValue(Promise.resolve(expectedValue));
    component.getNextRooms()
    expect(gameService.getRooms).toHaveBeenCalled();
    expect(component.hideLeftArrow).toBeTrue();
  });

  it('getNextRooms: should use getRooms and turn hideRightArrow true', () => {
    spyOn(component,'getNextRooms').and.callThrough();
    component.offset= 4;
    component.limit=4;
    gameService.getRooms.and.returnValue(Promise.resolve([]));
    component.getNextRooms()
    expect(gameService.getRooms).toHaveBeenCalled();

  });

  it('getPreviousRooms: should use getRooms and turn hideLeftArrow true', () => {
    spyOn(component,'getPreviousRooms').and.callThrough();
    component.offset= 4;
    component.limit=4;
    component.hideLeftArrow=false;
    fixture.detectChanges();
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

});
