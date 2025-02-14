import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XxeAttackAnimationComponent } from './xxe-attack-animation.component';

describe('XxeAttackAnimationComponent', () => {
  let component: XxeAttackAnimationComponent;
  let fixture: ComponentFixture<XxeAttackAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XxeAttackAnimationComponent]
    });
    fixture = TestBed.createComponent(XxeAttackAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
