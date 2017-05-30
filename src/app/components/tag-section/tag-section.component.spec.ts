import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSectionComponent } from './tag-section.component';

describe('TagSectionComponent', () => {
  let component: TagSectionComponent;
  let fixture: ComponentFixture<TagSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
