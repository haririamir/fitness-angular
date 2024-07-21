import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRootComponent } from './plan-root.component';

describe('PlanRootComponent', () => {
  let component: PlanRootComponent;
  let fixture: ComponentFixture<PlanRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
