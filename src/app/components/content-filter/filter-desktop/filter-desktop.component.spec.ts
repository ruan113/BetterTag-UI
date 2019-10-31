import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDesktopComponent } from './filter-desktop.component';

describe('FilterDesktopComponent', () => {
  let component: FilterDesktopComponent;
  let fixture: ComponentFixture<FilterDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
