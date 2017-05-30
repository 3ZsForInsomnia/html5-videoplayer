import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSourceComponent } from './url-source.component';

describe('UrlSourceComponent', () => {
  let component: UrlSourceComponent;
  let fixture: ComponentFixture<UrlSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
