import { TestBed, inject } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumbsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [BreadcrumbsService]
    });
  });

  it('should be created', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    expect(service).toBeTruthy();
  }));
});
