import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Filter } from 'src/app/models/filter/filter';
import {FilterService} from '../../services/filter/filter.service';

@Component({
  selector: 'app-display-controller',
  templateUrl: './display-controller.component.html',
  styleUrls: ['./display-controller.component.scss']
})
export class DisplayControllerComponent implements OnInit {

  private onDestroy$ = new Subject();

  @Input() playing: boolean;

  @Output() Next = new EventEmitter();
  @Output() Play = new EventEmitter();
  @Output() Back = new EventEmitter();

  isFullscreen = false;

  constructor(
    private utilsService: UtilsService,
    private filterService: FilterService
  ) {
    this.filterService.filtersChange.pipe(
      takeUntil(this.onDestroy$.asObservable())
    ).subscribe({
      next: (response: Filter) => {
        this.isFullscreen = response.modes.fullScreen;
      }
    });
  }

  ngOnInit() {
  }

  avanca() {
    this.Next.emit(true);
  }

  setPlay() {
    this.playing = !this.playing;

    if (this.playing) {
      this.Play.emit(true);
    } else {
      this.Play.emit(false);
    }
  }

  retorna() {
    this.Back.emit(true);
  }
}
