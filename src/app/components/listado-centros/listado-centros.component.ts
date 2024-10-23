import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CentroEducativoService } from '../../services/CentroEducativoService.service';
import { CentroEducativo } from '../../models/centroEducativo';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomPaginator } from '../../utils/CustomPaginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-listado-centros',
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
  templateUrl: './listado-centros.component.html',
  styleUrls: ['./listado-centros.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class ListadoCentrosComponent implements OnInit {
  TIPO_CENTROS = ['Público', 'Concertado', 'Privado'];

  // Tablas
  dataSource = new MatTableDataSource<CentroEducativo>();
  displayedColumns: string[] = ['nombre', 'direccion', 'tipoCentro', 'numeroAlumnos', 'numeroMaestros',
    'nivelesEducativosOfrecidos', 'coordenadasGeograficas', 'datosRendimientoAcademico'];

  // Filtros
  centros: CentroEducativo[] = [];
  filteredCentros: CentroEducativo[] = [];

  // FormControls para los filtros
  tipoCentroControl = new FormControl('');
  buscadorControl = new FormControl('');

  // Paginación
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // Ordenación
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private centroService: CentroEducativoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCentros();
  }

  /**
   * Carga todos los centros educativos desde el servicio.
   */
  loadCentros(): void {
    this.centroService.getAllCentros().subscribe(centros => {
      this.centros = centros;
      this.applyFilters();
    });
  }

  /**
   * Filtra los centros de acuerdo al tipo seleccionado y al input de búsqueda.
   */
  applyFilters(): void {
    const tipoCentro = this.tipoCentroControl.value;
    const searchValue = this.buscadorControl.value?.toLowerCase() || '';

    this.filteredCentros = this.centros.filter(centro => {
      const matchesTipoCentro = tipoCentro ? centro.tipoCentro === tipoCentro : true;
      const matchesSearch = (
        centro.nombre.toLowerCase().includes(searchValue) ||
        centro.direccion.toLowerCase().includes(searchValue) ||
        centro.nivelesEducativosOfrecidos.toLowerCase().includes(searchValue) ||
        centro.numeroAlumnos.toString().includes(searchValue) ||
        centro.numeroMaestros.toString().includes(searchValue) ||
        centro.coordenadasGeograficas.toString().includes(searchValue) ||
        centro.datosRendimientoAcademico?.toLowerCase().includes(searchValue)
      );

      return matchesTipoCentro && matchesSearch;
    });

    this.dataSource.data = this.filteredCentros;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.tipoCentroControl.setValue('');
    this.loadCentros();
  }
}
