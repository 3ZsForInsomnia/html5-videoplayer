import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipNewComponent } from './clip-new.component';

describe('ClipNewComponent', () => {
  let component: ClipNewComponent;
  let fixture: ComponentFixture<ClipNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
