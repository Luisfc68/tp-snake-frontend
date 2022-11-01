import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.scss']
})
export class PaginationButtonsComponent implements OnInit {


  constructor() { }

  @Output() notifyNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyPrevious: EventEmitter<any> = new EventEmitter<any>();


  @Input()
  statusLeftArrow!: boolean;
  @Input()
  statusRightArrow!: boolean;


  nextOnClick(): void {
    this.notifyNext.emit()
  }

  previousOnClick(): void {
    this.notifyPrevious.emit()
  }

  ngOnInit(): void {
  }


}
