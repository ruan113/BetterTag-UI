import {HostListener, Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, Subject} from 'rxjs';
import {Filter} from '../../models/filter/filter';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  public innerWidth: any;

  private onDestroy$ = new Subject();

  private screenSize$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  screenSize = this.screenSize$.asObservable();

  private isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.innerWidth = window.innerWidth;
    this.windowSizeSmallerThan('768px').pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe(response => {
      this.screenSize$.next(response.matches);
    });
  }

  windowSizeSmallerThan(max) {
    return this.breakpointObserver.observe([
      '(max-width: ' + max + ')'
    ]);
  }
}
