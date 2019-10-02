import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Filter } from 'src/app/models/filter/filter';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-content-filter',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.scss']
})
export class ContentFilterComponent implements OnInit {

  showFilter = false;

  filter: Filter = {
    onlyShow: {
      showImages: true,
      showGifs: true,
      showVideos: true
    },
    modes: {
      fullScreen: false
    }
  }

  @Output() changes: EventEmitter<Filter> = new EventEmitter<Filter>();

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

  setChanges() {
    console.log('novos filtros: ', this.filter);
    this.utilsService.setFilters(this.filter);
  }

}
