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

  // FormsControl para los filtros
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
      this.filteredCentros = centros;
      this.dataSource.data = this.filteredCentros;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Filtra los centros por tipo al seleccionar en el dropdown.
   */
  onTipoCentroChange(): void {
    const tipoCentro = this.tipoCentroControl.value;

    if (tipoCentro) {
      this.centroService.filterByTipoCentro(tipoCentro).subscribe(centros => {
        this.filteredCentros = centros;
        this.dataSource.data = this.filteredCentros;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.loadCentros();
    }
  }

  /**
   * Filtra dinámicamente los centros por nombre, dirección, tipo, alumnos, profesores, niveles educativos,
   * coordenadas geográficas y datos de rendimiento académico al introducir texto en el input.
   */
  onSearchInputChange(): void {
    const searchValue = this.buscadorControl.value?.toLowerCase() || '';

    this.filteredCentros = this.centros.filter(centro => {
      return (
        centro.nombre.toLowerCase().includes(searchValue) ||
        centro.direccion.toLowerCase().includes(searchValue) ||
        centro.nivelesEducativosOfrecidos.toLowerCase().includes(searchValue) ||
        centro.tipoCentro.toLowerCase().includes(searchValue) ||
        centro.numeroAlumnos.toString().includes(searchValue) ||
        centro.numeroMaestros.toString().includes(searchValue) ||
        centro.coordenadasGeograficas.toString().includes(searchValue) ||
        centro.datosRendimientoAcademico?.toLowerCase().includes(searchValue)
      );
    });
    this.dataSource.data = this.filteredCentros;
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
    this.tipoCentroControl.setValue('');
    this.loadCentros();
  }
}
