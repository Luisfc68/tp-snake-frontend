import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIcon} from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import {MatCard,MatCardModule} from '@angular/material/card';
import {MatDivider,MatDividerModule} from '@angular/material/divider';
import {LoginCardComponent} from '../../components/login-card/login-card.component'
import {SignupCardComponent} from '../../components/signup-card/signup-card.component'
import { FormBuilder} from '@angular/forms';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        JwtHelperService,
        MatDialog,
        MatSnackBar,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
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
        RouterTestingModule,
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule, 
        NoopAnimationsModule,
        MatIconTestingModule,
        MatCardModule,
        MatDividerModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
