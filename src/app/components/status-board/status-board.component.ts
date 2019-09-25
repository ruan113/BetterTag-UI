import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss']
})
export class StatusBoardComponent implements OnInit {

  @Input()
  url: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closePanel() {
    this.close.emit(false);
  }
}
