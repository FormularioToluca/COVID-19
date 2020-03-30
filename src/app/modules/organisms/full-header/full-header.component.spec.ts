import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHeaderComponent } from './full-header.component';
import { NavigationComponent } from '../../molecules/navigation/navigation.component';
import { NavigationModule } from '../../molecules/navigation/navigation.module';

describe('FullHeaderComponent', () => {
  let component: FullHeaderComponent;
  let fixture: ComponentFixture<FullHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NavigationModule
      ],
      declarations: [ FullHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
