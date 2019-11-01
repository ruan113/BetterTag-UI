import {Component, OnDestroy, OnInit} from '@angular/core';
import { UtilsService } from './services/utils/utils.service';
import { Filter } from './models/filter/filter';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {FilterService} from './services/filter/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bettertag-ui';

  private onDestroy$ = new Subject();

  filter: Filter;

  constructor(private filterService: FilterService) {
    this.filterService.filtersChange.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: Filter) => {
        console.log(response);
        this.filter = response;
      }
    });
  }

  ngOnInit(): void {
    this.filter = new Filter();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
