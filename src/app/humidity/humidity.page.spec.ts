import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HumidityPage } from './humidity.page';

describe('HumidityPage', () => {
  let component: HumidityPage;
  let fixture: ComponentFixture<HumidityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HumidityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
