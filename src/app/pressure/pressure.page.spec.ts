import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PressurePage } from './pressure.page';

describe('PressurePage', () => {
  let component: PressurePage;
  let fixture: ComponentFixture<PressurePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PressurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
