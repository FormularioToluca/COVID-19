import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectorComponent } from './language-selector.component';
import { DropdownModule } from '../../atoms/dropdown/dropdown.module';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule],
      declarations: [LanguageSelectorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
