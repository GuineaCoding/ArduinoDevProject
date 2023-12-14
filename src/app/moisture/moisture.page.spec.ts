import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoisturePage } from './moisture.page';

describe('MoisturePage', () => {
  let component: MoisturePage;
  let fixture: ComponentFixture<MoisturePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoisturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
