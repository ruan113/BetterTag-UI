import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatusBoardComponent } from './status-board/status-board.component';
import { ContentFilterComponent } from './content-filter/content-filter.component';
import { FormsModule } from '@angular/forms';
import { DisplayControllerComponent } from './display-controller/display-controller.component';
import { FilterDesktopComponent } from './content-filter/filter-desktop/filter-desktop.component';
import { FilterMobileComponent } from './content-filter/filter-mobile/filter-mobile.component';

const components = [
  HeaderComponent,
  FooterComponent,
  StatusBoardComponent,
  ContentFilterComponent,
  DisplayControllerComponent
];

@NgModule({
  declarations: [
    components,
    FilterDesktopComponent,
    FilterMobileComponent
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
