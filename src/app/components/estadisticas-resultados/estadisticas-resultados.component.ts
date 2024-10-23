import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { EstadisticaRendimientoEducativoService } from '../../services/EstadisticaRendimientoService.service'; 
import { EstadisticaRendimiento } from '../../models/EstadisticaRendimiento';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomPaginator } from '../../utils/CustomPaginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-estadisticas-resultados',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSortModule,
  ],
  templateUrl: './estadisticas-resultados.component.html',
  styleUrls: ['./estadisticas-resultados.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class EstadisticasResultadosComponent implements OnInit {
  // Constante filtros
  NIVEL_EDUCATIVO_S = ['Infantil', 'Primaria', 'ESO', 'Bachillerato'];
  
  // Tablas
  dataSource = new MatTableDataSource<EstadisticaRendimiento>();
  displayedColumns: string[] = ['nombreCentro','anoAcademico','nivelEducativo','numeroAlumnos',
    'promedioCalificaciones','numeroAlumnosNEEs','datosEspecificosRendimiento',];
  
    // Filtros
  estadisticas: EstadisticaRendimiento[] = [];
  filteredEstadisticas: EstadisticaRendimiento[] = [];

  // FormControls de inputs
  nivelEducativoControl = new FormControl('');
  buscadorControl = new FormControl('');

  // Paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // Ordenación
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private estadisticaService: EstadisticaRendimientoEducativoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEstadisticas();
  }

  /**
   * Método que carga las estadísticas para visualizarlas en la tabla.
   */
  loadEstadisticas(): void {
    this.estadisticaService.getAllEstadisticas().subscribe(estadisticas => {
      this.estadisticas = estadisticas;
      this.filteredEstadisticas = estadisticas;
      this.dataSource.data = this.filteredEstadisticas;
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Método para controlar el cambio del filtro 'Nivel educativo' y filtrar dinámicamente en la tabla
   * dependiendo del filtro de Nivel educativo que se introduzca.
   */
  onNivelEducativoSChange(): void {
    const nivelEducativo = this.nivelEducativoControl.value;

    if (nivelEducativo) {
      this.filteredEstadisticas = this.estadisticas.filter(estadistica => estadistica.nivelEducativo === nivelEducativo);
    } else {
      this.filteredEstadisticas = this.estadisticas;
    }

    this.dataSource.data = this.filteredEstadisticas; 
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Método para controlar el input de búsqueda de forma dinámica y actualiza la tabla segun los criterios de filtrado.
   */
  onSearchInputChange(): void {
    const searchValue = this.buscadorControl.value?.toLowerCase() || '';
    this.filteredEstadisticas = this.estadisticas.filter(estadistica => {
      return (
        estadistica.centro.nombre.toLowerCase().includes(searchValue) ||
        estadistica.nivelEducativo?.toLowerCase().includes(searchValue) ||
        estadistica.anoAcademico?.toString().includes(searchValue) ||
        estadistica.numeroAlumnos?.toString().includes(searchValue) ||
        estadistica.promedioCalificaciones?.toString().includes(searchValue) ||
        estadistica.numeroAlumnosNEEs?.toString().includes(searchValue) ||
        estadistica.datosEspecificosRendimiento?.toLowerCase().includes(searchValue)
      );
    });

    this.dataSource.data = this.filteredEstadisticas;
    this.dataSource.paginator = this.paginator;
  }

    /**
   * Maneja el cambio de página en el paginador.
   */
  onPageChange(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Método para volver a la pantalla principal.
   */
  volver(): void {
    this.router.navigate(['/principal']);
  }

    /**
   * Método para resetear los filtros
   */
  resetFilters(): void {
    this.buscadorControl.setValue('');
    this.nivelEducativoControl.setValue('');
    this.loadEstadisticas();
  }
}
