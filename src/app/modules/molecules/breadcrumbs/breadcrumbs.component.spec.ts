import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbsService } from './breadcrumbs.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [BreadcrumbsComponent],
      providers: [BreadcrumbsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
