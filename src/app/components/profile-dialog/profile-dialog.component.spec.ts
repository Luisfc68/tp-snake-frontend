import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDialogComponent } from './profile-dialog.component';
import { FormBuilder} from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '../../interfaces/player.interface';
import {MatCard,MatCardModule} from '@angular/material/card';
import { MatFormField,MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import playerMocked from '../../mockData/player.mock';
describe('ProfileDialogComponent', () => {
  let component: ProfileDialogComponent;
  let fixture: ComponentFixture<ProfileDialogComponent>;
  let player: Player = playerMocked;
  let data={
    player
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProfileDialogComponent,
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: {} },
        MatDialog,
        MatSnackBar,
        MatFormField
      ],
      declarations: [
        ProfileDialogComponent,
        MatCard
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule, 
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
