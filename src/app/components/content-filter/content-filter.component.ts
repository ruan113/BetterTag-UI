import {Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Filter} from 'src/app/models/filter/filter';
import {UtilsService} from 'src/app/services/utils/utils.service';
import {DOCUMENT} from '@angular/common';
import {FilterService} from '../../services/filter/filter.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-content-filter',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.scss']
})
export class ContentFilterComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject();

  elem;
  showFilter = false;

  @Input() playing;
  @Output() Next = new EventEmitter();
  @Output() Back = new EventEmitter();
  @Output() Play = new EventEmitter();

  // @Input()
  isMobile = false;

  filter: Filter = new Filter();

  constructor(
    private filterService: FilterService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.filterService.showFilters.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: boolean) => {
        this.showFilter = response;
      }
    });
  }

  ngOnInit() {
    this.elem = document.documentElement;
    this.filterService.setFilters(this.filter);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  setChanges(event: Filter) {
    this.filterService.setFilters(event);
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (window.innerWidth === screen.width && window.innerHeight === screen.height) {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  toggleFilter(event: boolean) {
    this.showFilter = event;
  }

  avanca() {
    this.Next.emit();
  }

  retorna() {
    this.Back.emit();
  }

  play() {
    this.Play.emit();
  }
}
