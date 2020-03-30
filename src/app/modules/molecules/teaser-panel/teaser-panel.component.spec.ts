import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaserPanelComponent } from './teaser-panel.component';

describe('TeaserPanelComponent', () => {
  let component: TeaserPanelComponent;
  let fixture: ComponentFixture<TeaserPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaserPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
