import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayersService } from 'src/app/services/players/players.service';
import { PaginationButtonsComponent } from '../../components/pagination-buttons/pagination-buttons.component';
import { PaginationButtonsModule } from '../../components/pagination-buttons/pagination-buttons.module';
import { ReturnButtonComponent } from '../../components/return-button/return-button.component';
import { ReturnButtonModule } from '../../components/return-button/return-button.module';
import playerMocked from '../../mockData/player.mock';
import { PlayersPageComponent } from './players-page.component';

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
    spyOn(component,'getNextPlayers').and.callThrough();
    const expectedValue= [playerMocked]
    playerService.getPlayers.and.returnValue(Promise.resolve(expectedValue));
    component.getNextPlayers();
    fixture.detectChanges();
    expect(playerService.getPlayers).toHaveBeenCalled();
  });


  it('should use getPlayers and turn hideRightArrow false', () => {
    component.hideRightArrow = true;
    fixture.detectChanges();
    spyOn(component,'getPreviousPlayers').and.callThrough();
    const expectedValue= [playerMocked]
    fixture.detectChanges();
    playerService.getPlayers.and.returnValue(Promise.resolve(expectedValue));
    component.getPreviousPlayers();
    expect(playerService.getPlayers).toHaveBeenCalled();
    expect(component.hideRightArrow).toBeFalse();
  });

  it('should use getPlayers and turn hideLeftArrow true', () => {
    component.hideLeftArrow = false;
    component.limit = 2;
    component.offset = 2;
    fixture.detectChanges();
    spyOn(component,'getPreviousPlayers').and.callThrough();
    const expectedValue= [playerMocked]
    fixture.detectChanges();
    playerService.getPlayers.and.returnValue(Promise.resolve(expectedValue));
    component.getPreviousPlayers();
    expect(playerService.getPlayers).toHaveBeenCalled();
    expect(component.hideLeftArrow).toBeTrue();

  });
});
