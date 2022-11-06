import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnakeBoardComponent } from './snake-board.component';
import game from '../../mockData/game.mock';
import {MatIcon} from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatChip,MatChipsModule } from '@angular/material/chips';


describe('SnakeBoardComponent', () => {
  let component: SnakeBoardComponent;
  let fixture: ComponentFixture<SnakeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        SnakeBoardComponent,
        MatIcon,
        MatChip
      ],
      imports:[
        MatIconTestingModule,
        MatChipsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeBoardComponent);
    fixture.componentInstance.game = game;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
