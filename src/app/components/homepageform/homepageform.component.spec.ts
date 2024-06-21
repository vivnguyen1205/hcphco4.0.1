import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageformComponent } from './homepageform.component';

describe('HomepageformComponent', () => {
  let component: HomepageformComponent;
  let fixture: ComponentFixture<HomepageformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
