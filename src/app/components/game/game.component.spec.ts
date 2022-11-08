import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import {MatCard,MatCardModule} from '@angular/material/card';
import  game from '../../mockData/game.mock';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent,MatCard ],
      imports:[MatCardModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    fixture.componentInstance.game = game
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
