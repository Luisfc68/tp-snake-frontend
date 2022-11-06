import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('GamesServiceService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamesService,
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
