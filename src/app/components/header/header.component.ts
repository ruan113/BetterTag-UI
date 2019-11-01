import {Component, OnInit} from '@angular/core';
import {CsvReaderService} from '../../services/csv-reader/csv-reader.service';
import {FilterService} from '../../services/filter/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private csvReaderService: CsvReaderService,
    private filterService: FilterService
  ) {
  }

  ngOnInit() {
  }

  onFileChange(files) {
    this.csvReaderService.onChange(files);
  }

  toggleFilters() {
    this.filterService.toggleFilter();
  }
}
