import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from '../../../models/filter/filter';
import {FilterService} from '../../../services/filter/filter.service';

@Component({
  selector: 'app-filter-mobile',
  templateUrl: './filter-mobile.component.html',
  styleUrls: ['./filter-mobile.component.scss']
})
export class FilterMobileComponent implements OnInit {

  @Input() showFilter;
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
