import {Component, OnInit} from '@angular/core';
import {CsvReaderService} from '../../services/csv-reader/csv-reader.service';
import {FilterService} from '../../services/filter/filter.service';
import {takeUntil} from 'rxjs/operators';
import {WindowService} from '../../services/utils/window.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private onDestroy$ = new Subject();

  isMobile = false;

  constructor(
    private csvReaderService: CsvReaderService,
    private filterService: FilterService,
    private windowService: WindowService,
  ) {
    this.windowService.screenSize.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: boolean) => {
        this.isMobile = response;
      }
    });
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
