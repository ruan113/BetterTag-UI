import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from '../../../models/filter/filter';

@Component({
  selector: 'app-filter-desktop',
  templateUrl: './filter-desktop.component.html',
  styleUrls: ['./filter-desktop.component.scss']
})
export class FilterDesktopComponent implements OnInit {

  @Input() showFilter;
  @Output() setVisible = new EventEmitter();
  @Output() changes = new EventEmitter();
  @Output() fullScreen = new EventEmitter();

  filter: Filter = new Filter();

  constructor() {
  }

  ngOnInit() {
  }

  toggleFilter() {
    this.setVisible.emit(!this.showFilter);
  }

  setChanges() {
    this.changes.emit(this.filter);
    this.setFullScreen(this.filter.modes.fullScreen);
  }

  setFullScreen(bool: boolean) {
    this.fullScreen.emit(bool);
  }
}
