import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from '../../../models/filter/filter';
import {FilterService} from '../../../services/filter/filter.service';

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

  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
  }

  toggleFilter() {
    this.filterService.toggleFilter();
  }

  setChanges() {
    this.changes.emit(this.filter);
  }

  setFullScreen(bool: boolean) {
    this.fullScreen.emit(bool);
  }
}
