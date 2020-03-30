import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaserPanelItemComponent } from './teaser-panel-item.component';

describe('TeaserPanelItemComponent', () => {
  let component: TeaserPanelItemComponent;
  let fixture: ComponentFixture<TeaserPanelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaserPanelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaserPanelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
