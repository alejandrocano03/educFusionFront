import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeGeneradoComponent } from './informe-generado.component';

describe('InformeGeneradoComponent', () => {
  let component: InformeGeneradoComponent;
  let fixture: ComponentFixture<InformeGeneradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeGeneradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeGeneradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
