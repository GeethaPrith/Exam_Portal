import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Directive({
  selector: '[appPerfectScrollbar]'
})
export class PerfectScrollbarDirective implements AfterViewInit,  OnDestroy {

  private ps?: PerfectScrollbar;

  @Input() psUpdateTrigger?: any; // Trigger for reinitialization

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.ps = new PerfectScrollbar(this.el.nativeElement, {
      wheelPropagation: true
    });
  }


  ngOnDestroy(): void {
    this.ps?.destroy();
  }

}
