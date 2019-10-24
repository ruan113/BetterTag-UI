import { Component, OnInit } from '@angular/core';
import {CsvReaderService} from '../../services/csv-reader/csv-reader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private csvReaderService: CsvReaderService) { }

  ngOnInit() {
  }

  onFileChange(files) {
    this.csvReaderService.onChange(files);
  }
}
