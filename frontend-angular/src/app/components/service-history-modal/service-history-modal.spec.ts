import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistoryModal } from './service-history-modal';

describe('ServiceHistoryModal', () => {
  let component: ServiceHistoryModal;
  let fixture: ComponentFixture<ServiceHistoryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceHistoryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceHistoryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
