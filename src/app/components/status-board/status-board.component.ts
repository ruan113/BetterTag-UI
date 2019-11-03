import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Photo} from '../../models/photo/photo';
import {UtilsService} from '../../services/utils/utils.service';
import {CsvReaderService} from '../../services/csv-reader/csv-reader.service';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss']
})
export class StatusBoardComponent implements OnInit {

  @Input()
  photo: Photo;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private utilsService: UtilsService,
    private csvService: CsvReaderService
  ) {
  }

  ngOnInit() {
  }

  closePanel() {
    this.close.emit(false);
  }

  removePhoto() {
    if (this.photo) {

    }
  }
}
