import { Component, OnDestroy } from '@angular/core';
import { UtilsService } from './services/utils/utils.service';
import { Filter } from './models/filter/filter';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'bettertag-ui';

  private onDestroy$ = new Subject();

  filter: Filter;

  constructor(private utilsService: UtilsService) {
    this.utilsService.filtersChange.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: Filter) => {
        console.log(response);
        this.filter = response;
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
