import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorDataPage } from './sensor-data.page';

describe('SensorDataPage', () => {
  let component: SensorDataPage;
  let fixture: ComponentFixture<SensorDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SensorDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
