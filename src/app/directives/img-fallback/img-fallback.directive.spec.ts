import { ImgFallbackDirective } from './img-fallback.directive';
import { TestBed } from '@angular/core/testing';
import {  ElementRef} from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('ImgFallbackDirective', () => {
  let directive: ImgFallbackDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImgFallbackDirective,
        { provide: ElementRef, useValue: new MockElementRef() }
      ]
    });
    directive = TestBed.inject(ImgFallbackDirective);
  });


  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});


