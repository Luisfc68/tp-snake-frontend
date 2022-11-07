import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamePageComponent } from './game-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: 'http://localhost:8080',
  options: {
    query: { gameId: null },
    reconnection: false,
    autoConnect: false
  }
};

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        MatSnackBar,
        MatDialog
      ],
      declarations: [ 
        GamePageComponent
      ],
      imports:[
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        SocketIoModule.forRoot(config),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
