import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemperaturePage } from './temperature.page';

describe('TemperaturePage', () => {
  let component: TemperaturePage;
  let fixture: ComponentFixture<TemperaturePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TemperaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
