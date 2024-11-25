import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarInformesComponent } from './generar-informes.component';

describe('GenerarInformesComponent', () => {
  let component: GenerarInformesComponent;
  let fixture: ComponentFixture<GenerarInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarInformesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
