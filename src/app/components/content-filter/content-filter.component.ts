import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Filter } from 'src/app/models/filter/filter';

@Component({
  selector: 'app-content-filter',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.scss']
})
export class ContentFilterComponent implements OnInit {

  showFilter = false;

  filter: Filter = {
    showImages: true,
    showGifs: true,
    showVideos: true
  }

  @Output() changes: EventEmitter<Filter> = new EventEmitter<Filter>();

  constructor() { }

  ngOnInit() {
  }

  emitChanges() {
    this.changes.emit(this.filter);
  }

}
