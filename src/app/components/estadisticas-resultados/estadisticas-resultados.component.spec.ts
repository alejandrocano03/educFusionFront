import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasResultadosComponent } from './estadisticas-resultados.component';

describe('EstadisticasResultadosComponent', () => {
  let component: EstadisticasResultadosComponent;
  let fixture: ComponentFixture<EstadisticasResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
