import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Filter } from 'src/app/models/filter/filter';

@Component({
  selector: 'app-display-controller',
  templateUrl: './display-controller.component.html',
  styleUrls: ['./display-controller.component.scss']
})
export class DisplayControllerComponent implements OnInit {

  private onDestroy$ = new Subject();

  @Input() playing: boolean;

  @Output() onNext: EventEmitter<Boolean> = new EventEmitter<Boolean>();;
  @Output() onPlay: EventEmitter<Boolean> = new EventEmitter<Boolean>();;
  @Output() onBack: EventEmitter<Boolean> = new EventEmitter<Boolean>();;

  isFullscreen = false;

  constructor(private utilsService: UtilsService) {
    this.utilsService.filtersChange.pipe(
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
    this.onNext.emit(true);
  }

  play() {
    this.playing = !this.playing;

    if (this.playing) {
      this.onPlay.emit(true);
    } else {
      this.onPlay.emit(false);
    }
  }

  retorna() {
    this.onBack.emit(true);
  }
}
