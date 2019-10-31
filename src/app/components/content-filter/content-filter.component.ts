import {Component, OnInit, Inject, Input, Output, EventEmitter} from '@angular/core';
import {Filter} from 'src/app/models/filter/filter';
import {UtilsService} from 'src/app/services/utils/utils.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-content-filter',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.scss']
})
export class ContentFilterComponent implements OnInit {
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
    private utilsService: UtilsService,
    @Inject(DOCUMENT) private document: any
  ) {
  }

  ngOnInit() {
    this.elem = document.documentElement;
    this.utilsService.setFilters(this.filter);
  }

  setChanges(event: Filter) {
    this.utilsService.setFilters(event);
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
