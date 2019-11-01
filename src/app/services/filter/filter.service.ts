import { Injectable } from '@angular/core';
import {Filter} from '../../models/filter/filter';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filtersChange$: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(null);
  filtersChange = this.filtersChange$.asObservable();

  filters: Filter;

  showFilters$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showFilters = this.showFilters$.asObservable();
  isShowing = false;

  constructor() { }

  setFilters(filters: Filter) {
    this.filters = filters;
    this.filtersChange$.next(this.filters);
  }

  getFilters() {
    return this.filters;
  }

  toggleFilter() {
    this.isShowing = !this.isShowing;
    this.showFilters$.next(this.isShowing);
  }

}
