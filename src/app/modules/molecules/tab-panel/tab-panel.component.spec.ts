import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelComponent } from './tab-panel.component';
import { NavigationModule } from '../navigation/navigation.module';
import { DropdownModule } from '../../atoms/dropdown/dropdown.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('TabPanelComponent', () => {
  let component: TabPanelComponent;
  let fixture: ComponentFixture<TabPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NavigationModule,
        DropdownModule,
        RouterTestingModule
      ],
      declarations: [ TabPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
