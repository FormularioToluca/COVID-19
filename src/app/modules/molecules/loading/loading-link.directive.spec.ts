import { LoadingLinkDirective } from './loading-link.directive';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <a routerLink="" rbLoadingLink="loading"></a> `
})
class TestHostComponent {
  value = null;
}

describe('LoadingLinkDirective', () => {
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoadingLinkDirective, TestHostComponent]
    })
      .compileComponents();

  }));

  it('should create an instance', () => {
    fixture = TestBed.createComponent(TestHostComponent);
    const directive = fixture.debugElement.query(By.directive(LoadingLinkDirective));
    expect(directive.componentInstance).toBeTruthy();
  });
});
