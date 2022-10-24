import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[fallback]'
})
export class ImgFallbackDirective {

  @Input()
  fallback!:string;

  constructor(
    private ref: ElementRef
  ) {}

  @HostListener('error')
  loadFallback() {
    const element:HTMLImageElement = this.ref.nativeElement as HTMLImageElement;
    element.src = this.fallback;
  }

}
