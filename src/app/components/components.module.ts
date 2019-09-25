import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatusBoardComponent } from './status-board/status-board.component';
import { ContentFilterComponent } from './content-filter/content-filter.component';
import { FormsModule } from '@angular/forms';

const components = [
  HeaderComponent,
  FooterComponent,
  StatusBoardComponent,
  ContentFilterComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    components
  ]
})
export class ComponentsModule { }
