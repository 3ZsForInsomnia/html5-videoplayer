import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipTagsComponent } from './clip-tags.component';

describe('ClipTagsComponent', () => {
  let component: ClipTagsComponent;
  let fixture: ComponentFixture<ClipTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
