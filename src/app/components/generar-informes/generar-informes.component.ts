import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CentroEducativoService } from '../../services/CentroEducativoService.service'; 
import { EstadisticaRendimientoEducativoService } from '../../services/EstadisticaRendimientoService.service';
import { CentroEducativo } from '../../models/centroEducativo';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Informe } from '../../models/informe';
import { InformeService } from '../../services/InformeService.service';
import { Usuario } from '../../models/usuario';
import { SharedUsuarioService } from '../../services/shared-usuario.service';
import { SharedInformeService } from '../../services/shared-informe.service';

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './generar-informes.component.html',
  styleUrls: ['./generar-informes.component.scss'],
  
})
export class GenerarInformesComponent implements OnInit {
  informeForm!: FormGroup;
  tiposInforme = ['Resultados Académicos', 'Rendimiento Comparativo', 'Análisis NEE'];
  anosAcademicos: number[] = [];
  centrosEducativos: CentroEducativo[] = [];
  datosOpcionales = [
    { label: 'Promedio de Calificaciones', value: 'Promedio de Calificaciones' },
    { label: 'Número de Alumnos', value: 'Número de Alumnos' },
    { label: 'Número de Alumnos NEEs', value: 'Número de Alumnos NEEs' },
    { label: 'Nivel Educativo', value: 'Nivel Educativo' },
  ];

  isActivated: boolean = false;
  usuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private centroService: CentroEducativoService,
    private rendimientoService: EstadisticaRendimientoEducativoService,
    private informeService: InformeService,
    private sharedUsuarioService: SharedUsuarioService,
    private sharedInformeService: SharedInformeService
  ) {}

  ngOnInit(): void {
    this.usuario = this.sharedUsuarioService.getUsuarioIniciado();
    this.initForm();
    this.loadCentros();
    this.loadAnosAcademicos();
  }

  /**
   * Inicializa el formulario reactivo.
   */
  initForm(): void {
    this.informeForm = this.fb.group({
      tipoInforme: ['', Validators.required],
      anoAcademico: ['', Validators.required],
      centroEducativo: ['', Validators.required],
      datosIncluidos: this.fb.array([], Validators.required),
    });
  }

  /**
   * Carga los centros educativos desde el servicio.
   */
  loadCentros(): void {
    this.centroService.getAllCentros().subscribe({
      next: (centros) => {
        this.centrosEducativos = centros;
      },
      error: (err) => {
        console.error('Error al cargar los centros educativos:', err);
      },
    });
  }

  /**
   * Carga los años académicos disponibles desde las estadísticas.
   */
  loadAnosAcademicos(): void {
    this.rendimientoService.getAllEstadisticas().subscribe({
      next: (estadisticas) => {
        const anosSet = new Set(estadisticas.map((e) => e.anoAcademico)); // Puede incluir undefined
        this.anosAcademicos = Array.from(anosSet)
          .filter((ano): ano is number => ano !== undefined) // Filtra los valores undefined
          .sort((a, b) => b - a); // Ordena en orden descendente
      },
      error: (err) => {
        console.error('Error al cargar los años académicos:', err);
      },
    });
  }
  

  /**
   * Maneja la selección y deselección de checkboxes.
   */
  onCheckboxChange(event: any): void {
    const datosIncluidos = this.informeForm.get('datosIncluidos') as FormArray;
    if (event.target.checked) {
      datosIncluidos.push(this.fb.control(event.target.value));
    } else {
      const index = datosIncluidos.controls.findIndex((x) => x.value === event.target.value);
      datosIncluidos.removeAt(index);
    }
  }
   

  /**
   * Navega a la pantalla principal.
   */
  volver(): void {
    this.router.navigate(['/principal']);
  }

  /**
   * Genera el informe basado en los datos seleccionados.
   */
  generarInforme(): void {
    if (this.informeForm.valid) {
  
      const centroSeleccionado = this.centrosEducativos.find(c => c.nombre === this.informeForm.value.centroEducativo);
  
      if (!centroSeleccionado) {
        console.error('Centro no válido');
        return;
      }
      if (!this.usuario) {
        console.error('Usuario no encontrado');
        return;
      }
  
      // Convertir datosIncluidos de array a string delimitado por comas
      const datosIncluidosString = (this.informeForm.value.datosIncluidos as string[]).join(',');
  
      const informe: Informe = {
        tipoInforme: this.informeForm.value.tipoInforme,
        datosIncluidos: datosIncluidosString,
        fechaGeneracion: new Date(),
        centro: centroSeleccionado,
        autorInforme: this.usuario || {}
      };
      
  
      // Llamar al servicio para guardar el informe
      this.informeService.createInforme(informe).subscribe({
        next: (nuevoInforme) => {
          this.sharedInformeService.setInformeGenerado(nuevoInforme);
          this.sharedInformeService.setAñoInforme(this.informeForm.value.anoAcademico);
          
          // Abrimos la pantalla de informe generado:
          this.router.navigate(['/informeGenerado']);
        },
        error: (err) => {
          console.error('Error al guardar el informe:', err);
        },
      });
    } else {
      this.isActivated = true;
    }
  }
  
  
}
