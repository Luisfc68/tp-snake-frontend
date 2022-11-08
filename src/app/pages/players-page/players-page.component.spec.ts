import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersPageComponent } from './players-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {ReturnButtonComponent} from '../../components/return-button/return-button.component'
import {ReturnButtonModule} from '../../components/return-button/return-button.module'
import {PaginationButtonsComponent} from '../../components/pagination-buttons/pagination-buttons.component'
import {PaginationButtonsModule} from '../../components/pagination-buttons/pagination-buttons.module'
import { PlayersService } from 'src/app/services/players/players.service';
import playerMocked from '../../mockData/player.mock';
import { ChangeDetectionStrategy } from '@angular/core';

describe('PlayersPageComponent', () => {
  let playerService: jasmine.SpyObj<PlayersService>;
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;


  beforeEach(async () => {
    const playerServiceSpy = jasmine.createSpyObj('PlayersService', ['getPlayers']);

    await TestBed.configureTestingModule({
      
      providers:[
        MatSnackBar,
        { provide: PlayersService, useValue: playerServiceSpy },

      ],
      declarations: [
        PlayersPageComponent,
        ReturnButtonComponent,
        PaginationButtonsComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        ReturnButtonModule,
        PaginationButtonsModule
      ]
    })
    .overrideComponent(PlayersPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
    playerService = TestBed.inject(PlayersService) as jasmine.SpyObj<PlayersService>;
    playerService.getPlayers.and.returnValue(Promise.resolve(Array.of()))
    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
      
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  it('should use getPlayers', (done: DoneFn) => {
    const expectedValue= [playerMocked];
    playerService.getPlayers.and.returnValue(Promise.resolve(expectedValue));
    component.getPlayers().then(result =>{
      expect(result).toBe(expectedValue);
    })
    done()
    
  });

  it('should use getPlayers and turn hideLeftArrow false', () => {
    const expectedValue= [playerMocked]
    playerService.getPlayers.and.returnValue(Promise.resolve(expectedValue));
    component.getNextPlayers();
    fixture.detectChanges();
    expect(playerService.getPlayers).toHaveBeenCalled();
  });

  it('should use getPlayers and turn hideRightArrow true', () => {
    playerService.getPlayers.and.returnValue(Promise.resolve([]));
    component.getNextPlayers();
    fixture.detectChanges();
    expect(playerService.getPlayers).toHaveBeenCalled();
  });

  it('should use getPlayers and turn hideRightArrow true', () => {
    spyOn(component,'getPreviousPlayers').and.callThrough();
    const expectedValue= [playerMocked]
    playerService.getPlayers.and.returnValue(Promise.resolve(expectedValue));
    component.getPreviousPlayers();
    fixture.detectChanges();
    expect(playerService.getPlayers).toHaveBeenCalled();
  });
});
