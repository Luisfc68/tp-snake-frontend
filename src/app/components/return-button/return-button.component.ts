import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrls: ['./return-button.component.scss']
})
export class ReturnButtonComponent implements OnInit {

  @Output()
  returnEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitReturn() {
    this.returnEvent.emit();
  }

}
