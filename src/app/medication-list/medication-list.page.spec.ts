import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicationListPage } from './medication-list.page';

describe('MedicationListPage', () => {
  let component: MedicationListPage;
  let fixture: ComponentFixture<MedicationListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
