import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { LoginCardComponent } from '../../components/login-card/login-card.component';
import { SignupCardComponent } from '../../components/signup-card/signup-card.component';
import { LoginRequest } from '../../interfaces/request/login.interface';
import { SignUpRequest } from '../../interfaces/request/signUp.interface';
import playerMocked from '../../mockData/player.mock';
import { AuthPageComponent } from './auth-page.component';



describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let playerService: jasmine.SpyObj<PlayersService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const playerServiceSpy = jasmine.createSpyObj('PlayersService', ['createPlayer']);
    await TestBed.configureTestingModule({
      providers:[
        JwtHelperService,
        MatDialog,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: PlayersService, useValue: playerServiceSpy },
        FormBuilder
      ],
      declarations: [ 
        AuthPageComponent,
        MatIcon,
        MatCard,
        MatDivider,
        LoginCardComponent,
        SignupCardComponent
      ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule, 
        NoopAnimationsModule,
        MatIconTestingModule,
        MatCardModule,
        MatDividerModule,
        MatSnackBarModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    playerService = TestBed.inject(PlayersService) as jasmine.SpyObj<PlayersService>;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doLogin: should use login(authService) and navigateBy Url(Router) methods', () => {
    const sent: LoginRequest = {email: 'test@example.com', password: 'test'};
    authService.login.and.returnValue(Promise.resolve(playerMocked));
    playerService.createPlayer.and.returnValue(Promise.resolve(playerMocked));
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    component.doLogin(sent);
    expect(authService.login).toHaveBeenCalled();
    authService.login('test@example.com','example').then(()=>{
      expect(router.navigateByUrl).toHaveBeenCalled();
    })
    });

  it('doSignUp: should use createPlayer (playerService), login(authService)', () => {
    const sent: SignUpRequest = {username:'example', email: 'test@example.com', password: 'test'};
    playerService.createPlayer.and.returnValue(Promise.resolve(playerMocked));
    authService.login.and.returnValue(Promise.resolve(playerMocked));
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    component.doSignUp(sent);
    expect(playerService.createPlayer).toHaveBeenCalled();
    playerService.createPlayer('example', 'test@example.com', 'test').then(()=>{
      expect(authService.login).toHaveBeenCalled();
    })
  });

});
