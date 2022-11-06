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

describe('PlayersPageComponent', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[MatSnackBar],
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
      .compileComponents();

    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
